import React, { Component } from "react"
import Main from "../template/Main"

const headerProps = {
    title: 'Sobre nós',
    subtitle: 'Conheça um pouco sobre nossa empresa.'
}

export default class UserAbout extends Component {
    render() {
        return (
            <Main {...headerProps}>
                Sobre nós
            </Main>
        )
    }
}