import React from 'react';

const Card = ({ 
  title, 
  description, 
  icon, 
  link, 
  className = '', 
  children,
  onClick,
  hover = true 
}) => {
  const cardContent = (
    <div className={`card border-0 shadow-sm h-100 ${hover ? 'card-hover' : ''} ${className}`}>
      <div className="card-body p-4">
        {icon && (
          <div className="card-icon mb-3">
            <i className={icon}></i>
          </div>
        )}
        {title && (
          <h5 className="card-title mb-3">{title}</h5>
        )}
        {description && (
          <p className="card-text text-muted mb-3">{description}</p>
        )}
        {children}
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="text-decoration-none">
        {cardContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        {cardContent}
      </div>
    );
  }

  return cardContent;
};

export default Card; 