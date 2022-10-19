import * as S from './styles'
import { Button, Form } from 'react-bootstrap'
import { ChatSquare } from '@styled-icons/bootstrap'
import { useGet } from 'hooks/api'

const HomeTemplate = () => {
  const { data: templates } = useGet('/getTemplates')

  console.log(templates)

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
