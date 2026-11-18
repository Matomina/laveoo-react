export default function LeaAvatar({ size = 40, showStatus = false }) {
    return (
        <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
            <img
                src="/lea-avatar.webp"
                alt="Léa, conseillère Laveoo"
                width={size}
                height={size}
                className="h-full w-full rounded-full object-cover"
            />
            {showStatus && (
                <span
                    className="absolute rounded-full border-2 border-white bg-[#22c55e]"
                    style={{
                        width: Math.max(size * 0.26, 10),
                        height: Math.max(size * 0.26, 10),
                        right: -1,
                        bottom: -1,
                    }}
                    aria-hidden="true"
                />
            )}
        </span>
    );
}
