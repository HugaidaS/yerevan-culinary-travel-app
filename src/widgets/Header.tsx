import { Link } from '@tanstack/react-router'

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-transparent z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">Armenian Cuisine</div>
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-white hover:text-armenian-cream transition-colors"
          >
            Home
          </Link>
          <Link
            to="#about"
            className="text-white hover:text-armenian-cream transition-colors"
          >
            About
          </Link>
          <Link
            to="#recipes"
            className="text-white hover:text-armenian-cream transition-colors"
          >
            Recipes
          </Link>
          <Link
            to="#contact"
            className="text-white hover:text-armenian-cream transition-colors"
          >
            Contact
          </Link>
        </nav>
        <button className="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
