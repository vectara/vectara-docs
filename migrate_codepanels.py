import os
import re
import argparse
import difflib

# Directory to process (relative to script or absolute)
DOCS_DIR = 'www/docs'  # Adjust if running from repo root

# Log files
LOG_FILE = 'migration_log.txt'
SUMMARY_FILE = 'migration_summary.txt'

def migrate_file(file_path, log_lines, test_mode):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content  # For comparison

    # Add import if not present (after frontmatter if any)
    if 'import CodePanel' not in content:
        # Find end of frontmatter
        frontmatter_end = 0
        frontmatter_match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
        if frontmatter_match:
            frontmatter_end = frontmatter_match.end()
        
        # Find the end of existing import statements after frontmatter
        import_matches = list(re.finditer(r'^import\s.*?$', content[frontmatter_end:], re.MULTILINE))
        if import_matches:
            last_import_end = frontmatter_end + import_matches[-1].end()
            insert_pos = last_import_end
        else:
            insert_pos = frontmatter_end
        
        # Adjust insert_pos to after the trailing newline if present
        if len(content) > insert_pos and content[insert_pos] == '\n':
            insert_pos += 1
        
        # Prepare import statement with blank line after
        import_statement = "import CodePanel from '@site/src/theme/CodePanel';\n\n"
        if insert_pos > 0:
            import_statement = '\n' + import_statement
        
        content = content[:insert_pos] + import_statement + content[insert_pos:]
        log_lines.append(f"Added import statement in {file_path}")

    # Count and replace fenced code blocks: ```lang?\ncode\n```
    fenced_pattern = r'```(\w+)?\s*\n(.*?)\n```'
    fenced_matches = re.findall(fenced_pattern, content, re.DOTALL | re.MULTILINE)
    num_fenced = len(fenced_matches)

    def replace_fenced(match):
        lang = match.group(1) if match.group(1) else 'bash'  # Default for cURL/api calls
        code = match.group(2).strip()
        # Escape for JS template literals (handle backticks, dollars, backslashes)
        code_escaped = code.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$')
        title = 'Code Example'  # Customize: e.g., 'API Request' if 'query' in code
        return f'<CodePanel snippets={{[{{language: "{lang}", code: `{code_escaped}`}}]}} title="{title}" layout="stacked" />'

    content = re.sub(fenced_pattern, replace_fenced, content, flags=re.DOTALL | re.MULTILINE)

    # Count and replace <pre> blocks: <pre><code class="language-lang">code</code></pre> or plain <pre>code</pre>
    pre_pattern = r'<pre>(.*?)</pre>'
    pre_matches = re.findall(pre_pattern, content, re.DOTALL | re.MULTILINE)
    num_pre = len(pre_matches)

    def replace_pre(match):
        inner = match.group(1).strip()
        # Extract lang and code if <code> present
        code_match = re.match(r'<code\s+class="language-(\w+)">(.*?)</code>', inner, re.DOTALL | re.IGNORECASE)
        if code_match:
            lang = code_match.group(1)
            code = code_match.group(2).strip()
        else:
            lang = 'text'
            code = inner
        code_escaped = code.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$')
        title = 'Code Example'
        return f'<CodePanel snippets={{[{{language: "{lang}", code: `{code_escaped}`}}]}} title="{title}" layout="stacked" />'

    content = re.sub(pre_pattern, replace_pre, content, flags=re.DOTALL | re.MULTILINE)

    # Log changes
    total_changes = num_fenced + num_pre
    if total_changes == 0:
        log_lines.append(f"No code blocks found in {file_path}")
    else:
        log_lines.append(f"Would replace {num_fenced} fenced blocks and {num_pre} <pre> blocks in {file_path}")

    # Handle test mode or actual write
    if content != original_content:
        diff = ''.join(difflib.unified_diff(
            original_content.splitlines(keepends=True),
            content.splitlines(keepends=True),
            fromfile=file_path,
            tofile=file_path + ' (proposed)'
        ))
        log_lines.append(f"Proposed diff for {file_path}:\n{diff}\n")
        
        if not test_mode:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
        else:
            log_lines.append(f"Test mode: No changes written to {file_path}")

# Main execution
parser = argparse.ArgumentParser(description="Migrate code blocks to CodePanel")
parser.add_argument('--test', action='store_true', help="Run in test mode: log changes without modifying files")
args = parser.parse_args()

log_lines = []
changed_files = []
unchanged_files = []
skipped_files = []
total_processed = 0
total_with_changes = 0
total_skipped = 0

for root, dirs, files in os.walk(DOCS_DIR):
    if 'rest-api' in root:  # Skip rest-api subdirectory entirely
        for file in files:
            if file.endswith(('.md', '.mdx')):
                skipped_files.append(os.path.join(root, file))
        total_skipped += len([f for f in files if f.endswith(('.md', '.mdx'))])
        log_lines.append(f"Skipped directory {root} (rest-api)")
        continue  # Skip this dir and its files
    for file in files:
        if file.endswith(('.md', '.mdx')):
            file_path = os.path.join(root, file)
            print(f"Processing {file_path}")
            migrate_file(file_path, log_lines, args.test)
            total_processed += 1
            # Determine if changed
            file_logs = [line for line in log_lines if file_path in line]
            if any("Added import" in log or "replace" in log for log in file_logs):
                changed_files.append(file_path)
                total_with_changes += 1
            else:
                unchanged_files.append(file_path)

# Summary for log
log_lines.append("\nSummary:")
log_lines.append(f"Total files processed: {total_processed}")
log_lines.append(f"Files with potential changes: {total_with_changes}")
log_lines.append(f"Files skipped (in rest-api): {total_skipped}")
if args.test:
    log_lines.append("Test mode enabled: No files were modified. Review diffs in this log.")

# Write main log
with open(LOG_FILE, 'w', encoding='utf-8') as log_f:
    log_f.write('\n'.join(log_lines))

# Write summary file
summary_lines = ["Changed Files:"]
summary_lines.extend(changed_files)
summary_lines.append("\nUnchanged Files:")
summary_lines.extend(unchanged_files)
summary_lines.append("\nSkipped Files:")
summary_lines.extend(skipped_files)

with open(SUMMARY_FILE, 'w', encoding='utf-8') as sum_f:
    sum_f.write('\n'.join(summary_lines))

print(f"Processing complete. Log saved to {LOG_FILE}. Summary saved to {SUMMARY_FILE}.")
if args.test:
    print("Test mode: Check the log for proposed diffs without any file changes.")
else:
    print("Migration complete. Review changes, then commit.")