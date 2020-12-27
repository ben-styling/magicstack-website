import '../styles/global.scss'
import type { AppProps } from 'next/app'
import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
    GithubClient,
    TinacmsGithubProvider,
    GithubMediaStore,
} from 'react-tinacms-github'

export default class Site extends App {
    cms: TinaCMS

    constructor(props: AppProps) {
        super(props)

        const github = new GithubClient({
            proxy: '/api/proxy-github',
            authCallbackRoute: '/api/create-github-access-token',
            clientId: process.env.GITHUB_CLIENT_ID || '',
            baseRepoFullName: process.env.REPO_FULL_NAME || '',
            baseBranch: process.env.BASE_BRANCH,
        })


        this.cms = new TinaCMS({
            enabled: !!props.pageProps.preview,
            apis: { github },
            media: new GithubMediaStore(github),
            sidebar: props.pageProps.preview,
            toolbar: props.pageProps.preview,
        })
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            <TinaProvider cms={this.cms}>
                <TinacmsGithubProvider
                    onLogin={onLogin}
                    onLogout={onLogout}
                    error={pageProps.error}>
                    <style jsx global>{`
                        @font-face {
                            font-family: 'FuturaPT';
                            src: url(/fonts/FuturaPTBook.woff2) format('woff2');
                            font-weight: 400;
                            font-style: normal;
                            font-display: fallback;
                        }
                        @font-face {
                            font-family: 'FuturaPT';
                            src: url('/fonts/FuturaPTBookOblique.woff2')
                                format('woff2');
                            font-weight: 400;
                            font-style: italic;
                            font-display: fallback;
                        }
                        @font-face {
                            font-family: 'FuturaPT';
                            src: url('/fonts/FuturaPTMedium.woff2')
                                format('woff2');
                            font-weight: 500;
                            font-style: normal;
                            font-display: fallback;
                        }
                        @font-face {
                            font-family: 'FuturaPT';
                            src: url('/fonts/FuturaPTHeavy.woff2')
                                format('woff2');
                            font-weight: 600;
                            font-style: normal;
                            font-display: fallback;
                        }
                    `}</style>
                    <Component {...pageProps} cms={this.cms} />
                </TinacmsGithubProvider>
            </TinaProvider>
        )
    }
}

const onLogin = async () => {
    const token = localStorage.getItem('tinacms-github-token') || null
    const headers = new Headers()

    if (token) {
        headers.append('Authorization', 'Bearer ' + token)
    }

    const resp = await fetch(`/api/preview`, { headers: headers })
    const data = await resp.json()

    if (resp.status == 200) window.location.href = window.location.pathname
    else throw new Error(data.message)
}

const onLogout = async () => {
    await fetch(`/api/reset-preview`)
    window.location.reload()
}
