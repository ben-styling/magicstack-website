export default function Footer() {
    const currentYear = new Date(Date.now()).getFullYear()
    return (
        <footer className="footer container">
            <div className="copyright">Copyright {currentYear} magicSTACK All rights reserved</div>
            <nav>
                <a href="#">Terms of service</a>
                <a href="#">Privacy policy</a>
                <a href="#">Cookie settings</a>
            </nav>
        </footer>
    )
}
