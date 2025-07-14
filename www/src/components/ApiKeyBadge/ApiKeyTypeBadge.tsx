import React from 'react';

interface ApiKeyTypeBadgeProps {
  types: string[];
}

const ApiKeyTypeBadge: React.FC<ApiKeyTypeBadgeProps> = ({ types }) => {
  const getColor = (type: string): string => {
    switch (type) {
      case 'Personal Key':
        return '#10b981'; // Green
      case 'QueryService Key':
        return '#3b82f6'; // Blue
      case 'IndexService Key':
        return '#f59e0b'; // Amber
      default:
        return '#6b7280'; // Gray
    }
  };

  const getBadgeStyle = (type: string) => ({
    backgroundColor: getColor(type),
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500' as const,
    display: 'inline-block',
    marginRight: '4px',
    marginBottom: '4px',
    whiteSpace: 'nowrap' as const,
  });

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '4px',
    marginBottom: '12px',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <span style={{ fontSize: '14px', fontWeight: '600', marginRight: '8px' }}>
        Required API Key Type{types.length > 1 ? 's' : ''}:
      </span>
      {types.map((type, index) => (
        <span key={index} style={getBadgeStyle(type)}>
          {type}
        </span>
      ))}
    </div>
  );
};

export default ApiKeyTypeBadge;