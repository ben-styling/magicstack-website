import Logo from '../assets/logo.svg'

export default function Header() {
    return (
        <header className="header">
            <Logo />
            <a
                className="button button--outline-black"
                href="https://github.com/chrisnharvey/magicstack">
                View on GitHub
            </a>
        </header>
    )
}
