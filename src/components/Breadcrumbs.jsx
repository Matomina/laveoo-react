import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
    return (
        <nav aria-label="Fil d'Ariane" className="bg-white py-3">
            <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 text-sm text-[#595959] sm:px-6 lg:px-8">
                {items.map((item, index) => (
                    <li key={item.to} className="flex items-center gap-2">
                        {index > 0 && <span aria-hidden="true">/</span>}
                        {index === items.length - 1 ? (
                            <span className="font-semibold text-[#1F3A5F]" aria-current="page">{item.name}</span>
                        ) : (
                            <Link to={item.to} className="hover:text-[#1769E8] hover:underline">{item.name}</Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
