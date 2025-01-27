"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const mobileWidth = 900;

interface Link {
	text: string;
	href: string;
}

const links: Link[] = [
	{ text: "Home", href: "" },
	{ text: "About", href: "about" },
	{ text: "Experiences", href: "experiences" },
	{ text: "Contact", href: "contact" },
];

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (mobileMenuOpen === true && window.innerWidth >= mobileWidth) {
				setMobileMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [mobileMenuOpen]);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`w-full flex justify-center fixed top-0 z-[100] bg-background border-b border-b-foreground/5 shadow-sm ${
				mobileMenuOpen ? "" : ""
			} ${isScrolled ? "" : ""}`}
		>
			<div className="max-w-[90rem] mx-auto p-4 h-auto w-full flex justify-between items-center mobile-navbar:flex-col">
				<div className="w-full flex items-center justify-between">
					<h2 className="text-2xl font-bold transition-colors duration-200">
						My Website
					</h2>

					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="mobile-navbar:w-6 mobile-navbar:h-6 mobile-navbar:relative mobile-navbar:block hidden"
						aria-label="toggle menu"
					>
						<motion.span
							className="block absolute bg-foreground w-full h-[0.16rem]"
							transition={{ duration: 0.18, ease: "linear" }}
							animate={mobileMenuOpen ? "cross" : "menu"}
							style={{
								top: "25%",
								left: "50%",
								x: "-50%",
								y: "-50%",
							}}
							variants={{
								cross: {
									rotate: "45deg",
									top: "50%",
								},
								menu: {
									rotate: "0deg",
								},
							}}
						/>
						<motion.span
							className="block absolute bg-foreground w-full h-[0.16rem]"
							transition={{ duration: 0.18, ease: "linear" }}
							animate={mobileMenuOpen ? "cross" : "menu"}
							style={{
								top: "75%",
								left: "50%",
								x: "-50%",
								y: "-50%",
							}}
							variants={{
								cross: {
									rotate: "-45deg",
									top: "50%",
								},
								menu: {
									rotate: "0deg",
								},
							}}
						/>
					</button>
				</div>
				<motion.div
					className="flex items-center gap-3.5 mobile-navbar:flex-col mobile-navbar:overflow-clip"
					transition={{ duration: 0.18, ease: "linear" }}
					animate={mobileMenuOpen && window.innerWidth <= mobileWidth ? "open" : "closed"}
					style={{
						height: 0,
						padding: 0,
					}}
					variants={{
						open: {
							height: "fit-content",
							paddingBottom: "1rem",
						},
						closed: {
							height: 0,
							padding: 0,
						},
					}}
				>
					{links.map(({ text, href }, i) => (
						<Button className="" variant="ghost" key={i} asChild>
							<a href={"#" + href}>{text}</a>
						</Button>
					))}
					<span className="flex gap-3.5 mobile-navbar:flex-row-reverse">
						<Button className="" variant="outline" asChild>
							<a href="#">Secondary</a>
						</Button>
						<Button className="" asChild>
							<a href="#">Primary</a>
						</Button>
					</span>
				</motion.div>
			</div>
		</nav>
	);
}
