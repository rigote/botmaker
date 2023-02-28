/* eslint-disable no-undef */
import * as S from './styles'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useGet } from 'hooks/api'
import { useState, useEffect } from 'react'
import local from 'api/local'
import Script from 'next/script'

const HomeTemplate = () => {
  const client = typeof ZAFClient !== 'undefined' && ZAFClient.init()
  const [validateFields, setValidateFields] = useState({
    zen: '',
    bot: '',
    chat: ''
  })
  const [apiParams, setApiParams] = useState({
    chatPlatform: 'whatsapp',
    chatChannelNumber: '553599347686',
    platformContactId: '',
    ruleNameOrId: '',
    params: {}
  })
  const [variables, setVariables] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    variant: 'success'
  })

  const authToken = async () => {
    const vars = {
      chatChannelNumber: '{{setting.chatChannelNumber}}',
      zendeskAccessToken: '{{setting.zendeskAccessToken}}',
      botmakerAccessToken: '{{setting.botmakerAccessToken}}'
    }

    const options = {
      url: 'https://botmaker.vercel.app/api/getAgent',
      type: 'POST',
      secure: true,
      contentType: 'application/json',
      data: JSON.stringify(vars)
    }

    client.request(options).then((results) => {
      setValidateFields({
        ...validateFields,
        zen: results.zenToken,
        bot: results.botToken,
        chat: results.chat
      })
    })
  }

  const { data: templates } = useGet('/getTemplates')
  //const { data: agents } = useGet('/getAgent')

  const getVariables = (str) => {
    const text = str.split('-')
    const regex = /\$\{\b.*?}/gs
    let m
    const tempArr = []

    while ((m = regex.exec(text[0])) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }

      m.forEach((item) => {
        tempArr.push(`${item.replace('${', '').replace('}', '')}`)
      })
    }

    setApiParams({
      ...apiParams,
      ruleNameOrId: text[1],
      params: { ...apiParams.params, ['template_message']: text[0] }
    })
    setVariables(tempArr)
  }

  const sendBotMaker = async () => {
    setLoading(true)
    try {
      const res = await local.post('/sendBotmaker', apiParams)
      setApiParams({
        ...apiParams,
        platformContactId: '',
        ruleNameOrId: '',
        params: {}
      })
      setAlert({ ...alert, show: true, variant: 'success' })
    } catch (error) {
      setAlert({ ...alert, show: true, variant: 'danger' })
    }
    setLoading(false)
    setTimeout(() => {
      setAlert({ ...alert, show: false })
    }, 2000)
  }

  useEffect(() => {
    if (client) {
      authToken()
    }
  }, [])

  console.log('Get agent', authToken)

  return (
    <S.Wrapper>
      <S.Name>
        <span>Nome</span>
        <b>Botmaker Bot</b>
      </S.Name>
      <Form>
        <Alert
          key={alert.variant}
          variant={alert.variant}
          transition={alert.show}
          show={alert.show}
        >
          {alert.variant === 'success'
            ? 'Enviado com sucesso!'
            : 'Ocorreu um erro, tente novamente'}
        </Alert>
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
              templates?.waTemplates.map((item, index) => (
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
              agents?.users
                .filter((u) => u.role_type !== 1)
                .map((item, index) => (
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
