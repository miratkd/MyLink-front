describe('Main spec', () => {
  it('project is up', () => {
    cy.visit('')
  })
  it.only('test home form', () => {

    // test empty inputs
    cy.visit('')
    cy.get('[id="nuxt-devtools-anchor"]')
    cy.get('[data-test="login-title"]').as('login-title').should('be.visible')
    cy.get('[data-test="email-input"').as('email-input').should('not.have.class', 'border-red-500')
    cy.get('[data-test="password-input"').as('password-input').should('not.have.class', 'border-red-500')
    cy.get('[data-test="email-label"]').as('email-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="password-label"]').as('password-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="input-alert"]').should('not.be.visible')
    cy.get('[data-test="login-button"]').as('login-button').click()
    cy.get('@email-input').should('have.class', 'border-red-500')
    cy.get('@password-input').should('have.class', 'border-red-500')
    cy.get('@email-label').should('have.class', 'text-red-500')
    cy.get('@password-label').should('have.class', 'text-red-500')
    cy.get('[data-test="input-alert"]').as('input-alert').should('have.length', 2)
    cy.get('@input-alert').first().should('have.text', 'Preencha os campos')
    cy.get('@input-alert').last().should('have.text', 'Preencha os campos')
    cy.get('@login-title').should('be.visible')

    // test wrong credentials
    cy.visit('')
    cy.get('[id="nuxt-devtools-anchor"]')


    cy.get('@login-title').should('be.visible')
    cy.get('@email-input').should('not.have.class', 'border-red-500')
    cy.get('@email-label').should('not.have.class', 'text-red-500')
    cy.get('@email-input').should('not.have.class', 'border-red-500')
    cy.get('@email-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="input-field"]').as('input-field').first().type('abc')
    cy.wait(500)
    cy.get('@input-field').last().type('123123')

    cy.intercept('POST', 'https://mylinkback-production.up.railway.app/api/login', {
      statusCode: 403,
      fixture: 'wrongCredentials.json'
    })

    cy.get('@login-button').click()

    cy.get('@email-input').should('have.class', 'border-red-500')
    cy.get('@password-input').should('have.class', 'border-red-500')
    cy.get('@email-label').should('have.class', 'text-red-500')
    cy.get('@password-label').should('have.class', 'text-red-500')
    cy.get('@input-alert').first().should('have.text', 'Incorreto')
    cy.get('@input-alert').last().should('have.text', 'Incorreto')

    // test right credentials
    cy.visit('')
    cy.get('[id="nuxt-devtools-anchor"]')


    cy.get('@login-title').should('be.visible')
    cy.get('@input-field').first().type('abc@hotmail.com')
    cy.get('@input-field').last().type('123123')

    cy.intercept('POST', 'https://mylinkback-production.up.railway.app/api/login', {
      statusCode: 201,
      fixture: 'rightCredentials.json'
    })

    cy.get('@login-button').click()
    cy.get('@login-title').should('not.exist')
    cy.get('[data-test="dashboard-title"]').should('exist')

    // test create account link
    cy.visit('')
    cy.get('[id="nuxt-devtools-anchor"]')


    cy.get('@login-title').should('be.visible')
    cy.get('[data-test="create-account-button"]').click()
    cy.get('@login-title').should('not.exist')
    cy.get('[data-test="create-account-title"]').should('exist')
  })
  it('test create account', () => {
    // test empty inputs
    cy.visit('create-account')
    cy.get('[id="nuxt-devtools-anchor"]')
    cy.get('[data-test="create-account-title"]').as('create-account-title').should('be.visible')

    cy.get('[data-test="email-label"]').as('email-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="email-input"]').as('email-input').should('not.have.class', 'border-red-500')

    cy.get('[data-test="name-label"]').as('name-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="name-input"]').as('name-input').should('not.have.class', 'border-red-500')

    cy.get('[data-test="password-label"]').as('password-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="password-input"]').as('password-input').should('not.have.class', 'border-red-500')

    cy.get('[data-test="confirm-password-label"]').as('confirm-password-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="confirm-password-input"]').as('confirm-password-input').should('not.have.class', 'border-red-500')

    cy.get('[data-test="create-account-button"]').as('create-account-button').click()

    cy.get('@email-label').should('have.class', 'text-red-500')
    cy.get('@email-input').should('have.class', 'border-red-500')
    cy.get('@name-label').should('have.class', 'text-red-500')
    cy.get('@name-input').should('have.class', 'border-red-500')
    cy.get('@password-label').should('have.class', 'text-red-500')
    cy.get('@password-input').should('have.class', 'border-red-500')
    cy.get('@confirm-password-label').should('have.class', 'text-red-500')
    cy.get('@confirm-password-input').should('have.class', 'border-red-500')
    cy.get('[data-test="input-alert"]').as('input-alert').should('have.length', 4)
    cy.get('@input-alert').eq(0).should('have.text', 'insira um email')
    cy.get('@input-alert').eq(1).should('have.text', 'insira um nome')
    cy.get('@input-alert').eq(2).should('have.text', 'insira uma senha')
    cy.get('@input-alert').eq(3).should('have.text', 'insira uma senha')

    const account = {email: 'test@hotmail.com', name: 'test', password: '13972684'}
    cy.get('[data-test="input-field"]').as('input-field').eq(0).type(account.name)
    cy.get('@input-field').eq(1).type(account.name)
    cy.get('@input-field').eq(2).type(account.password)
    cy.get('@input-field').eq(3).type(account.name)

    cy.get('@create-account-button').click()
    cy.get('@email-input').should('have.class', 'border-red-500')
    cy.get('@password-input').should('have.class', 'border-red-500')
    cy.get('@confirm-password-input').should('have.class', 'border-red-500')
    cy.get('@input-alert').eq(0).should('have.text', 'insira um email valido')
    cy.get('@input-alert').eq(2).should('have.text', 'senhas diferentes')
    cy.get('@input-alert').eq(3).should('have.text', 'senhas diferentes')

    cy.get('@input-alert').eq(2).click()
    cy.get('@input-field').eq(2).clear()
    cy.get('@input-field').eq(2).type('abc')
    cy.get('@input-field').eq(3).clear()
    cy.get('@input-field').eq(3).type('abc')

    cy.get('@create-account-button').click()
    cy.get('@input-alert').eq(2).should('have.text', 'senha muito curta')
    cy.get('@input-alert').eq(3).should('have.text', 'senha muito curta')


    // test request inputs
    cy.visit('create-account')
    cy.get('[id="nuxt-devtools-anchor"]')

    cy.get('@email-input').type(account.email)
    cy.get('@name-input').type(account.name)
    cy.get('@password-input').type(account.password)
    cy.get('@confirm-password-input').type(account.password)


    cy.intercept('POST', 'https://mylinkback-production.up.railway.app/api/users', {
      statusCode: 422,
      fixture: 'emailTaken.json'
    }).as('email taken')
    cy.get('@create-account-button').click()
    cy.get('@input-alert').eq(0).should('have.text', 'email já em uso')

    cy.intercept('POST', 'https://mylinkback-production.up.railway.app/api/users', {
      statusCode: 201,
      fixture: 'createAccount.json'
    }).as('create account')

    cy.get('@input-alert').eq(0).click()
    cy.get('@create-account-button').click()
    
    cy.get('@create-account-title').should('not.exist')
    cy.get('[data-test="login-title"]').as('login-title').should('be.visible')
    cy.get('@input-field').first().should('have.value', account.email)
    cy.get('@input-field').last().should('have.value', account.password)

  })
})