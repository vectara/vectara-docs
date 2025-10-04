---
id: manage-agents
title: Manage Agents
sidebar_label: Manage Agents
---

The Agents page displays all created agents, allowing you to monitor their 
status and details. From here, you can create new agents, search for existing 
ones, reload the list, and navigate through pages of agents. Each agent's 
information includes its unique ID, name, enabled status, creation date, and 
last updated timestamp.

## Access the Agents page

- Log in to your Vectara account.
- Navigate to the Agents section in the sidebar.

![Agent page](/img/agents/list_agents.png)
  
The Agents page lets you complete the following tasks:
- **Create agent**: Click the **Add agent** button in the top-right corner 
  to start the agent creation wizard (see Create an Agent topic for details).
- **Search**: Use the **Search agents...** text box to filter the list by name 
  or ID.
- **Reload**: Click the **Reload** button to refresh the agent list and update 
  statuses or details.
- **Pagination**: Use **Previous** and **Next** links to navigate through multiple 
  pages of agents if the list exceeds the display limit.

## List agents

- **ID**: A unique identifier for the agent (`agt_tech_docs_agent_d163`), 
  useful for API interactions or troubleshooting.
- **Name**: The human-readable name assigned during creation (**Tech Docs Agent**).
- **Enabled**: Indicates if the agent is active (green **Enabled**) or disabled 
  (gray **Disabled**). Toggle this status with the dropdown menu next to each agent.
- **Creation date**: The date and time the agent was created "8/15/2025,
  4:52:48 PM".
- **Last updated**: The date and time of the agent's last modification 
  "8/26/2025, 9:18:06 PM".

## View agent details

- Click the agent name or ID to view detailed configuration (model, tools, 
  instructions) in a read-only view or edit mode, depending on permissions.

## Enable or disable an agent

- Locate the agent in the table.
- Click the drop-down at the end of the row.
- Select **Enable** or **Disable** to toggle its status. Disabled agents 
  cannot process queries but remain available for editing or re-enabling.

### Delete an agent

- Click the drop-down at the end of the row.
- Select **Delete** and confirm to remove the agent permanently. This action 
  cannot be undone.


## Best Practices
- **Naming convention**: Use clear, descriptive names (**Tech Docs Agent**) to 
  avoid confusion.
- **Status monitoring**: Regularly check the **Enabled** column to ensure agents 
  are active when needed.
- **Metadata use**: Leverage metadata (set during creation) to filter or group 
  agents through search by team or category).
- **Regular updates**: Edit agents to reflect changes in corpora, tools, or 
  instructions, and verify updates with **Last updated.**
  