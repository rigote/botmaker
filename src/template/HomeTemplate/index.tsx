import * as S from './styles'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { ChatSquare } from '@styled-icons/bootstrap'
import { useGet } from 'hooks/api'
import { useState } from 'react'
import local from 'api/local'

const HomeTemplate = () => {
  const [apiParams, setApiParams] = useState({
    chatPlatform: 'whatsapp',
    chatChannelNumber: '553599347686',
    platformContactId: '',
    ruleNameOrId: '',
    params: {}
  })
  const [variables, setVariables] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { data: templates } = useGet('/getTemplates')
  const { data: agents } = useGet('/getAgent')

  const getVariables = (str: any) => {
    const text = str.split('-')
    const regex = /\$\{\b.*?}/gs
    let m
    const tempArr: string[] = []

    while ((m = regex.exec(text[0])) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }

      m.forEach((item) => {
        tempArr.push(`${item.replace('${', '').replace('}', '')}`)
      })
    }

    setApiParams({ ...apiParams, ruleNameOrId: text[1] })
    setVariables(tempArr)
  }

  const sendBotMaker = async () => {
    setLoading(true)
    const res = await local.post('/sendBotmaker', apiParams)
    console.log(res)
    setLoading(false)
  }

  return (
    <S.Wrapper>
      <S.Name>
        <span>Nome</span>
        <b>Botmaker Bot</b>
      </S.Name>
      <Form>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Número de telefone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite seu telefone"
            onChange={(e) =>
              setApiParams({ ...apiParams, platformContactId: e.target.value })
            }
          />
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
                <option key={index} value={item.content + '-' + item.name}>
                  {item.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        {variables.length > 0 &&
          variables.map((item, index) => (
            <Form.Group className="mb-3" controlId="item" key={index}>
              <Form.Label>{item}</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setApiParams({
                    ...apiParams,
                    params: { ...apiParams.params, [item]: e.target.value }
                  })
                }
              />
            </Form.Group>
          ))}

        <Form.Group>
          <Form.Label>Atribuir retorno ao agente</Form.Label>
          <Form.Select
            aria-label="Selecione um agente"
            onChange={(e) =>
              setApiParams({
                ...apiParams,
                params: { ...apiParams.params, ['agenteid']: e.target.value }
              })
            }
          >
            <option>Selectione um agente</option>
            {!!Object &&
              agents?.users.map((item: any, index: any) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </Form>
      <Button variant="primary" size="lg" onClick={() => sendBotMaker()}>
        {loading ? (
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            &nbsp;
            <span>Enviando</span>
          </>
        ) : (
          <span>Enviar</span>
        )}
      </Button>
    </S.Wrapper>
  )
}

export default HomeTemplate
