import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface ApiKeyBadgeProps {
  types: string | string[];
}

const API_KEY_COLORS = {
  Personal: '#249719',     // Green
  QueryService: '#045dda', // Blue
  IndexService: '#a86f1b', // Amber
  default: '#69707d'       // Gray
};

const API_KEY_LABELS = {
  Personal: 'Personal',
  QueryService: 'Query Service',
  IndexService: 'Index Service'
};

export default function ApiKeyBadge({ types }: ApiKeyBadgeProps) {
  const typeArray = Array.isArray(types) ? types : [types];
  
  return (
    <div className={styles.badgeContainer}>
      <span className={styles.badgeLabel}>Supported API Key Type:</span>
      <div className={styles.badgeGroup}>
        {typeArray.map((type, index) => (
          <span
            key={index}
            className={clsx(styles.badge)}
            style={{
              backgroundColor: API_KEY_COLORS[type as keyof typeof API_KEY_COLORS] || API_KEY_COLORS.default,
              color: 'white'
            }}
          >
            {API_KEY_LABELS[type as keyof typeof API_KEY_LABELS] || type}
          </span>
        ))}
      </div>
    </div>
  );
}

// Also export as named export for backward compatibility
export { ApiKeyBadge };