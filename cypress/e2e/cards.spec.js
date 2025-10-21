describe('Cards do site - mensagens', () => {
  before(() => {
    cy.visit('/') // baseUrl será setado no CI / local via npm start
  })

  it('exibe 6 cards', () => {
    cy.get('.card').should('have.length', 6)
  })

  it('verifica títulos principais dos cards', () => {
    const titulos = [
      'Passo 1: Entenda os Fundamentos',
      'Passo 2: Aprenda Conceitos Chave',
      'Passo 3: Domine as Ferramentas',
      'Passo 4: Desenvolva Soft Skills',
      'Passo 5: Lógica e SQL',
      'Passo 6: Pratique!'
    ]

    cy.get('.card h2').then(($els) => {
      const texts = [...$els].map(el => el.innerText.trim())
      titulos.forEach(t => expect(texts).to.include(t))
    })
  })

  it('verifica parte do texto do primeiro card', () => {
    cy.get('.card').first().within(() => {
      cy.contains('QA não é apenas "encontrar bugs"').should('exist')
    })
  })
})