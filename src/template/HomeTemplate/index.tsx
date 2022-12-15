import * as S from './styles'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { ChatSquare } from '@styled-icons/bootstrap'
import { useGet } from 'hooks/api'
import { useState } from 'react'

const HomeTemplate = () => {
  const [apiParams, setApiParams] = useState({
    chatPlatform: 'whatsapp',
    chatChannelNumber: '',
    platformContactId: '',
    ruleNameOrId: '',
    params: {}
  })
  const [variables, setVariables] = useState<string[]>([])

  const { data: templates } = useGet('/getTemplates')
  const { data: agents } = useGet('/getAgent')

  const getVariables = (str: any) => {
    const regex = /\$\{\b.*?}/gs
    let m
    const tempArr: string[] = []

    while ((m = regex.exec(str)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }

      m.forEach((item) => {
        tempArr.push(`${item.replace('${', '').replace('}', '')}`)
      })
    }

    setVariables(tempArr)
  }

  console.log('Agents', agents)

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
          <Form.Select
            aria-label="Selecione um template"
            onChange={(e) => getVariables(e.target.value)}
          >
            <option>Selecione um template</option>
            {!!Object &&
              templates?.waTemplates.map((item: any, index: any) => (
                <option key={index} value={item.content}>
                  {item.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        {variables.length > 0 &&
          variables.map((item, index) => (
            <Form.Group className="mb-3" controlId="item" key={index}>
              <Form.Label>{item}</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          ))}

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
