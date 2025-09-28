const FinancialDashboardLogo = ({ 
  size = 200, 
  className = "", 
  showText = true,
  animate = true 
}) => {
  return (
    <div className={`inline-block ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#3B82F6', stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:'#8B5CF6', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#06B6D4', stopOpacity:1}} />
          </linearGradient>
          
          <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#F59E0B', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#EAB308', stopOpacity:1}} />
          </linearGradient>
          
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#10B981', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#059669', stopOpacity:1}} />
          </linearGradient>
          
          <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="4" result="offset"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge> 
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
          
          {showText && (
            <path id="textcircle" d="M 100,100 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"/>
          )}
        </defs>
        
        <circle 
          cx="100" 
          cy="100" 
          r="95" 
          fill="url(#bgGradient)" 
          filter="url(#dropshadow)"
        />
        
        <circle 
          cx="100" 
          cy="100" 
          r="80" 
          fill="rgba(255,255,255,0.1)" 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="2"
        />
        
        <g transform="translate(60, 60)">
          <circle 
            cx="20" 
            cy="20" 
            r="18" 
            fill="url(#coinGradient)" 
            filter="url(#dropshadow)"
          />
          <circle 
            cx="20" 
            cy="20" 
            r="15" 
            fill="rgba(255,255,255,0.2)"
          />
          
          <path 
            d="M25 12 Q28 12 30 15 L27 17 Q26 15 25 15 Q22 15 20 17 Q18 19 18 20 Q18 21 20 23 Q22 25 25 25 Q26 25 27 23 L30 25 Q28 28 25 28 Q20 28 16 24 Q12 20 12 20 Q12 20 16 16 Q20 12 25 12 Z" 
            fill="white" 
            opacity="0.9"
          />
          <line 
            x1="14" y1="18" x2="24" y2="18" 
            stroke="white" 
            strokeWidth="2" 
            opacity="0.9"
          />
          <line 
            x1="14" y1="22" x2="24" y2="22" 
            stroke="white" 
            strokeWidth="2" 
            opacity="0.9"
          />
        </g>
        
        <g transform="translate(110, 70)">
          <rect x="5" y="15" width="8" height="25" fill="url(#chartGradient)" rx="2" filter="url(#dropshadow)"/>
          <rect x="18" y="10" width="8" height="30" fill="url(#chartGradient)" rx="2" filter="url(#dropshadow)"/>
          <rect x="31" y="20" width="8" height="20" fill="url(#chartGradient)" rx="2" filter="url(#dropshadow)"/>
          <rect x="44" y="5" width="8" height="35" fill="url(#chartGradient)" rx="2" filter="url(#dropshadow)"/>
          
          <path 
            d="M9 32 Q22 20 35 28 Q48 15 57 22" 
            stroke="#10B981" 
            strokeWidth="3" 
            fill="none" 
            opacity="0.8"
          />
          <circle cx="9" cy="32" r="2.5" fill="#10B981"/>
          <circle cx="22" cy="25" r="2.5" fill="#10B981"/>
          <circle cx="35" cy="28" r="2.5" fill="#10B981"/>
          <circle cx="57" cy="22" r="2.5" fill="#10B981"/>
        </g>
        
        <g transform="translate(70, 120)">
          <rect 
            x="0" y="0" width="60" height="35" 
            rx="8" 
            fill="rgba(255,255,255,0.9)" 
            filter="url(#dropshadow)"
          />
          <rect 
            x="3" y="3" width="54" height="29" 
            rx="6" 
            fill="url(#bgGradient)"
          />
          
          <rect 
            x="8" y="8" width="12" height="8" 
            rx="2" 
            fill="rgba(255,255,255,0.3)"
          />
          
          <line 
            x1="25" y1="12" x2="45" y2="12" 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="2"
          />
          <line 
            x1="25" y1="18" x2="52" y2="18" 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="2"
          />
          <line 
            x1="25" y1="24" x2="40" y2="24" 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="2"
          />
        </g>
        
        {animate && (
          <g opacity="0.6">
            <circle cx="40" cy="40" r="3" fill="rgba(255,255,255,0.5)">
              <animate attributeName="cy" values="40;35;40" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="160" cy="50" r="2" fill="rgba(255,255,255,0.4)">
              <animate attributeName="cy" values="50;45;50" dur="4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="170" cy="150" r="2.5" fill="rgba(255,255,255,0.3)">
              <animate attributeName="cy" values="150;145;150" dur="3.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="30" cy="170" r="2" fill="rgba(255,255,255,0.5)">
              <animate attributeName="cy" values="170;165;170" dur="4.5s" repeatCount="indefinite"/>
            </circle>
          </g>
        )}
        
        {showText && (
          <text 
            fontFamily="Arial, sans-serif" 
            fontSize="14" 
            fontWeight="bold" 
            fill="rgba(255,255,255,0.8)"
          >
            <textPath href="#textcircle" startOffset="25%">
              
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

const LogoShowcase = () => {
  return   <FinancialDashboardLogo size={60} />
};

export default LogoShowcase;