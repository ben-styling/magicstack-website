import Logo from '../assets/logo.svg'

export default function Header() {
    return (
        <header className="header">
            <Logo />
            <nav className="site-nav">
                <a href="#get-started">Get started</a>
                <a href="#features">Features</a>
                <a href="#docs">Docs</a>
                <a
                    className="button button--outline-black"
                    href="https://github.com/chrisnharvey/magicstack">
                    View on GitHub
                </a>
            </nav>
        </header>
    )
}
