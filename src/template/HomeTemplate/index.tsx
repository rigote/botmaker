import * as S from './styles'
import { Button, Form } from 'react-bootstrap'
import { ChatSquare } from '@styled-icons/bootstrap'
import { useGet } from 'hooks/api'
import { useEffect } from 'react'
import api from 'api/api'

const HomeTemplate = () => {
  const getTemplates = async () => {
    const response = await api.get('/v1.0/waTemplates', {
      headers: {
        'access-token': process.env.NEXT_PUBLIC_ACCESSTOKEN,
        'Content-Type': 'application/json'
      }
    })
    console.log(response)
  }

  useEffect(() => {
    getTemplates()
  }, [])

  return (
    <S.Wrapper>
      <S.Name>
        <span>Nome</span>
        <b>Botmaker Bot</b>
      </S.Name>
      <Form>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Número de telefone</Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
          <Form.Text className="text-muted">Digite apenas números</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Template</Form.Label>
          <Form.Select aria-label="Selecione um template">
            <option>Selecione um template</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Atribuir retorno ao agente</Form.Label>
          <Form.Select aria-label="Selecione um agente">
            <option>Selectione um agente</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <Button variant="primary" size="lg">
        Enviar
      </Button>
    </S.Wrapper>
  )
}

export default HomeTemplate
