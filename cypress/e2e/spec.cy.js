describe('Main spec', () => {
  it('project is up', () => {
    cy.visit('')
  })
  it('test home form', () => {

    // test empty inputs
    cy.visit('')
    // cy.wait(1500)
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
})