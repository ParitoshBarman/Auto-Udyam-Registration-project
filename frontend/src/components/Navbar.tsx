import React, { useState } from "react";


const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <nav className="bg-[#4B2CC2] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14">
                        {/* Logo */}
                        <div className="flex items-center space-x-4">
                            <img
                                src="/image.png"
                                alt="Ministry Logo"
                                className="h-10"
                            />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-6">
                            <NavItem label="Home" />
                            <NavItem label="NIC Code" />
                            <NavItem
                                label="Useful Documents"
                                hasDropdown
                                items={["Guideline 1", "Guideline 2"]}
                            />
                            <NavItem
                                label="Print / Verify"
                                hasDropdown
                                items={["Print", "Verify"]}
                            />
                            <NavItem
                                label="Update Details"
                                hasDropdown
                                items={["Details 1", "Details 2"]}
                            />
                            <NavItem label="Login" hasDropdown items={["Admin", "User"]} />
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="focus:outline-none"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={
                                            isOpen
                                                ? "M6 18L18 6M6 6l12 12"
                                                : "M4 6h16M4 12h16M4 18h16"
                                        }
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-[#4B2CC2] px-4 pb-4 space-y-2">
                        <NavItem label="Home" mobile />
                        <NavItem label="NIC Code" mobile />
                        <NavItem
                            label="Useful Documents"
                            hasDropdown
                            items={["Guideline 1", "Guideline 2"]}
                            mobile
                        />
                        <NavItem
                            label="Print / Verify"
                            hasDropdown
                            items={["Print", "Verify"]}
                            mobile
                        />
                        <NavItem
                            label="Update Details"
                            hasDropdown
                            items={["Details 1", "Details 2"]}
                            mobile
                        />
                        <NavItem label="Login" hasDropdown items={["Admin", "User"]} mobile />
                    </div>
                )}
            </nav>

            {/* Title Section */}
            <div className="bg-gray-100 text-center py-2 text-sm sm:text-base font-medium" style={{ fontSize: "26px", backgroundColor: "rgb(224 242 255)", color: "#241b63", fontWeight: "500", padding: "15px 0", minHeight: "40px" }}>
                UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet
                as MSME
            </div>
        </>
    );
};

interface NavItemProps {
    label: string;
    hasDropdown?: boolean;
    items?: string[];
    mobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
    label,
    hasDropdown = false,
    items = [],
    mobile = false,
}) => (
    <div className={`group relative ${mobile ? "block" : "inline-block"}`}>
        <span
            className={`cursor-pointer ${mobile ? "block py-2 border-b border-white/20" : "relative"
                }`}
        >
            {label}
            {!mobile && (
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            )}
            {hasDropdown && !mobile && " ▾"}
        </span>

        {/* Dropdown for Desktop */}
        {hasDropdown && !mobile && (
            <ul className="hidden group-hover:block absolute right-0 mt-1 bg-white text-black text-xs rounded shadow-lg z-50">
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        )}

        {/* Dropdown for Mobile */}
        {hasDropdown && mobile && (
            <ul className="pl-4 text-white/90 text-sm">
                {items.map((item, idx) => (
                    <li key={idx} className="py-1">
                        {item}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default Navbar;
