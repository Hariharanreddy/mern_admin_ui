const LogoIcon = () => {
    return (
        <svg
            width="120"
            height="28"
            viewBox="0 0 120 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="24" height="24" rx="6" fill="#7C3AED" />
            <path
                d="M14 7C14 7 11 7 11 10V12H8V15H11V21H14V15H17V12H14V10C14 9.5 14.5 9 15 9H17V7H14Z"
                fill="white"
                transform="translate(-1, 0)"
            />
            <rect x="8" y="11" width="12" height="2" rx="1" fill="white" />
            <path
                d="M9 13H19V19C19 20.1 18.1 21 17 21H11C9.9 21 9 20.1 9 19V13Z"
                fill="white"
                fillOpacity="0.3"
            />
            <rect x="13" y="7" width="2" height="14" rx="1" fill="white" fillOpacity="0.5" />
            <text
                x="34"
                y="19"
                fontFamily="Inter, system-ui, -apple-system, sans-serif"
                fontWeight="700"
                fontSize="15"
                fill="#1F1F1F">
                GiftHub
            </text>
        </svg>
    );
};

export default LogoIcon;
