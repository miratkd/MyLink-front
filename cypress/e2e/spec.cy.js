describe('Main spec', () => {
  it('project is up', () => {
    cy.visit('')
  })
  it('test home form', () => {

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

    // test create account link
    cy.visit('')
    cy.get('[id="nuxt-devtools-anchor"]')


    cy.get('@login-title').should('be.visible')
    cy.get('[data-test="create-account-button"]').click()
    cy.get('@login-title').should('not.exist')
    cy.get('[data-test="create-account-title"]').should('exist')
    
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
  })
  it('test create account', () => {
    // acessa a pagina
    cy.visit('create-account')
    // espera a pagina carregar (exclusividade do nuxt)
    cy.get('[id="nuxt-devtools-anchor"]')
    // checa se o titulo da pagina esta mostrando
    cy.get('[data-test="create-account-title"]').as('create-account-title').should('be.visible')
    // checa se os inputs estão sem o alerta
    cy.get('[data-test="email-label"]').as('email-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="email-input"]').as('email-input').should('not.have.class', 'border-red-500')
    cy.get('[data-test="name-label"]').as('name-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="name-input"]').as('name-input').should('not.have.class', 'border-red-500')
    cy.get('[data-test="password-label"]').as('password-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="password-input"]').as('password-input').should('not.have.class', 'border-red-500')
    cy.get('[data-test="confirm-password-label"]').as('confirm-password-label').should('not.have.class', 'text-red-500')
    cy.get('[data-test="confirm-password-input"]').as('confirm-password-input').should('not.have.class', 'border-red-500')
    // clica no botão
    cy.get('[data-test="create-account-button"]').as('create-account-button').click()
    // checa se os inputs estão com o alerta
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
  it('test dashboard', ()=>{
    cy.intercept('GET', 'https://mylinkback-production.up.railway.app/api/cards', {
      statusCode: 200,
      fixture: 'listCards.json'
    }).as('get cards')
    window.localStorage.setItem('token', '123123')
    cy.visit('dashboard')
    // espera a pagina carregar (exclusividade do nuxt)
    cy.get('[id="nuxt-devtools-anchor"]')
    cy.get('[data-test="dashboard-title"]').as('dashboard-title').should('exist')
    cy.get('[data-test="add-new-card"]').as('add-new-card').should('exist')
    cy.get('[data-test="create-card-modal"]').should('not.exist')
    cy.get('[data-test="card-component-11"]').should('exist')
    cy.get('[data-test="card-component-title-11"]').should('have.text', 'lucas - Vue | Nuxt | Laravel')
    cy.get('[data-test="card-component-13"]').should('exist')
    cy.get('[data-test="card-component-title-13"]').should('have.text', 'asdawdas')

    cy.get('@add-new-card').click()

    cy.get('[data-test="create-card-modal"]').as('create-card-modal').should('exist')
    cy.get('[data-test="create-card-button"]').as('create-card-button').click()
    cy.get('@create-card-modal').should('exist')
    cy.get('[data-test="title-label"]').as('title-label').should('have.class','text-red-500')
    cy.get('[data-test="email-label"]').as('email-label').should('have.class','text-red-500')
    cy.get('[data-test="description-label"]').as('description-label').should('have.class','text-red-500')

    cy.get('[data-test="title-input"]').type('test card')
    cy.get('[data-test="email-input"]').type('test-card@hotmail.com')
    cy.get('[data-test="description-input"]').type('adasdawdasd')

    cy.intercept('POST', 'https://mylinkback-production.up.railway.app/api/cards', {
      statusCode: 201,
      fixture: 'createCard.json'
    }).as('create card')
    cy.intercept('GET', 'https://mylinkback-production.up.railway.app/api/cards', {
      statusCode: 200,
      fixture: 'listCardsFull.json'
    }).as('get cards full')

    cy.get('@create-card-button').click()

    cy.get('[data-test="card-component-14"]').should('exist')
    cy.get('[data-test="card-component-title-14"]').should('have.text', 'test card')

    cy.get('[data-test="remove-card-modal"]').should('not.exist')
    cy.get('[data-test="card-component-delete-14"]').click()
    cy.get('[data-test="remove-card-modal"]').as('remove-card-modal').should('exist')


    cy.intercept('DELETE', 'https://mylinkback-production.up.railway.app/api/cards/14', {
      statusCode: 200,
      fixture: 'deleteCard.json'
    }).as('delete card')

    cy.get('[data-test="remove-card-button"]').click()

    cy.get('@remove-card-modal').should('not.exist')

  })

  it('test edit card', ()=>{
    cy.viewport(1024, 768)
    cy.intercept('GET', 'https://mylinkback-production.up.railway.app/api/plataforms/', {
      statusCode: 200,
      fixture: 'listPlataforms.json'
    }).as('get plataforms')
    cy.intercept('GET', 'https://mylinkback-production.up.railway.app/api/cards/16', {
      statusCode: 200,
      fixture: 'getCard.json'
    }).as('get card')
    window.localStorage.setItem('token', '123123')
    cy.visit('card-16')
    // espera a pagina carregar (exclusividade do nuxt)
    cy.get('[id="nuxt-devtools-anchor"]')
    cy.get('[data-test="add-link-title"]').should('be.visible')
    cy.get('[data-test="card-title"]').should('have.text', 'Mira -Dev')
    cy.get('[data-test="card-email"]').should('have.text', 'nuxt2@hotmail.com')
    cy.get('[data-test="card-description"]').should('have.text', 'Desenvolvedor Full Stack | Vue.js | Nuxt.js | JavaScript | Django | Python | Laravel | PHP | Cypress | Tailwind')
    cy.get('[data-test="link-button-19"]').as('telegram-button').should('be.visible')
    cy.get('@telegram-button').should('contain.text', 'Telegram')
    cy.get('[data-test="link-button-17"]').as('instagram-button').should('be.visible')
    cy.get('@instagram-button').should('contain.text', 'Instagram')
    cy.get('[data-test="link-button-18"]').as('snapchat-button').should('be.visible')
    cy.get('@snapchat-button').should('contain.text', 'Snapchat')
    cy.get('[data-test="link-button-20"]').should('not.exist')
    cy.get('[data-test="create-link-modal"]').should('not.exist')
    cy.get('[data-test="add-new-link"]').click()
    cy.get('[data-test="create-link-modal"]').should('be.visible')
    cy.get('[data-test="select-plataform-new"]').select(2)
    cy.get('[data-test="new-input"]').type('test123123')
    cy.intercept('POST', 'https://mylinkback-production.up.railway.app/api/addLink', {
      statusCode: 200,
      fixture: 'newLink.json'
    }).as('add link')
    cy.get('[data-test="create-link-button"]').click()
    cy.get('[data-test="link-button-20"]').as('linkdin-button').should('be.visible')
    cy.get('@linkdin-button').should('contain.text', 'Linkdin')
  })
})