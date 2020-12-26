import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
    GithubClient,
    TinacmsGithubProvider,
    GithubMediaStore,
} from 'react-tinacms-github'
import '../styles/global.scss'
import type { AppProps } from 'next/app'

export default class Site extends App {
    cms: TinaCMS
    displayButton: boolean

    constructor(props: AppProps) {
        super(props)

        const github = new GithubClient({
            proxy: '/api/proxy-github',
            authCallbackRoute: '/api/create-github-access-token',
            clientId: process.env.GITHUB_CLIENT_ID || '',
            baseRepoFullName: process.env.REPO_FULL_NAME || '',
            baseBranch: process.env.BASE_BRANCH,
        })

        /**
         * 1. Create the TinaCMS instance
         */
        this.cms = new TinaCMS({
            enabled: !!props.pageProps.preview,
            apis: {
                /**
                 * 2. Register the GithubClient
                 */
                github,
            },
            /**
             * 3. Register the Media Store
             */
            media: new GithubMediaStore(github),
            /**
             * 4. Use the Sidebar and Toolbar
             */
            sidebar: props.pageProps.preview,
            toolbar: props.pageProps.preview,
        })

        this.displayButton =
            props.router.asPath === '/?cms=' || props.router.asPath === '/?cms'

        console.log(props.router.asPath)
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            /**
             * 5. Wrap the page Component with the Tina and Github providers
             */
            <TinaProvider cms={this.cms}>
                <TinacmsGithubProvider
                    onLogin={onLogin}
                    onLogout={onLogout}
                    error={pageProps.error}>
                    <EditLink cms={this.cms} display={this.displayButton} />
                    <Component {...pageProps} />
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

const onLogout = () => {
    return fetch(`/api/reset-preview`).then(() => {
        window.location.reload()
    })
}

export interface EditLinkProps {
    cms: TinaCMS
    display: boolean
}

export const EditLink = ({ cms, display }: EditLinkProps) => {
    return (
        <button
            onClick={() => cms.toggle()}
            className="site-edit-button"
            style={{ display: display ? 'block' : 'none' }}>
            {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
        </button>
    )
}
