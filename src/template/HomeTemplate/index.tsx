import * as S from './styles'
import { Form } from 'react-bootstrap'
import Button from 'components/Button'
import { ChatSquare } from '@styled-icons/bootstrap'

const HomeTemplate = () => (
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
    <Button color="blue" icon={<ChatSquare />} fullWidth>
      Enviar
    </Button>
  </S.Wrapper>
)

export default HomeTemplate
