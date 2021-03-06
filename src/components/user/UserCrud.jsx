import React, { Component } from "react"
import Main from "../template/Main"
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Eventos',
    subtitle: 'Cadastro de eventos: Incluir, Listar, Alterar e Excluir'
}



const setSelect = (label, valuesInput) => {
    return (
        <div className="col-12 col-md-6">
            <div className="form-group">
                <label>{label}</label>
                <select name='category' className="form-control"
                        onChange={e => this.updateField(e)}>
                    <option>Selecione</option>
                    <option>{valuesInput[0]}</option>
                    <option>{valuesInput[1]}</option>
                    <option>{valuesInput[2]}</option>
                </select>
            </div>
        </div>
    )
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '', event:'', description:'', date:'', category:''},
    list: []
}

export default class UserCrud extends Component {
    
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }
    
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add=true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    setComponent(label, valueInput, nameInput, placeholder='', type='text') {
    return (
        <div className="col-12 col-md-6">
            <div className="form-group">
                <label>{label}</label>
                <input type={type} className="form-control"
                    name={nameInput}
                    value={valueInput}
                    onChange={e => this.updateField(e)}
                    placeholder={placeholder} />
            </div>
        </div>
    )
}


    renderForm() {
        return (
            <div className="form">
                
                <h5>Insira os dados necess??rios para efetuar o cadastro:</h5><hr />
                <div className="row">
                    {this.setComponent('Nome do Organizador', this.state.user.name, 'name', 'Digite o nome do organizador')}
                    {this.setComponent('E-mail do organizador', this.state.user.email, 'email', 'Digite o email do organizador')}
                    {this.setComponent('Titulo do evento', this.state.user.event, 'event', 'Digite o titulo do evento')}
                    {this.setComponent('Descricao', this.state.user.description, 'description', 'Detalhe a descri????o do evento')}
                    {this.setComponent('Data do evento', this.state.user.date, 'date','','date')}
                    {setSelect('Selecione a categoria', ['Categoria 1', 'Categoria 2', 'Categoria 3'])}
                </div>
            <hr />
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                    onClick={e => this.save(e)}>
                        Salvar
                    </button>
                    <buttton className="btn btn-secondary ml-2"
                    onClick={e => this.clear(e)}>
                        Cancelar
                    </buttton>
                </div>
            </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>A????es</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                        onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
