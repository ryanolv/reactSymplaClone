import React, { Component } from "react"
import Main from "../template/Main"

const propsTicket = {
    title: 'Ingressos a venda',
    subtitle: 'Selecione o evento que deseja comprar a entrada.'
}

export default class UserTicket extends Component {
    render() {
        return (
            <Main { ...propsTicket }>
                Escolha o evento abaixo.
            </Main>
        )
    }
}