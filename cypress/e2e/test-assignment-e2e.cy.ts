beforeEach(() => {
  cy.visit("/");
})

describe('test input type textbox', () => {
  it('Input should exist', () => {
    cy.get("input").should("exist");
  })

  it('Should be able to type', () => {
    cy.get("input").type("film").should("have.value", "film");
    cy.get("button").click();
  })

  it('Should not show movies', () => {
    cy.get("button").click();
    cy.get("p").should("exist");
    cy.get("p").should("have.value", "").contains("Inga sökresultat att visa");
  })

  it('Should find movie title', () => {
    cy.get("input").type("film").should("have.value", "film");
    cy.get("button").click();
    cy.get("h3").contains("Film").should("exist");
  })

  it('Should find movie poster', () => {
    cy.get("input").type("film").should("have.value", "film");
    cy.get("button").click();
    cy.get("img").should("exist");
  })
})

describe("Testing url", () => {
  it("should get mockdata with correct url", () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=efad8a03&s=*", {fixture: "omdbResponse"}).as("omdbCall");
    cy.get("input").type("Cars 3");
    cy.get("button").click();
    cy.wait("@omdbCall").its("request.url").should("contain", "Cars%203");
  });
})

describe("Testing errors", () => {
  it("Should display error", () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=efad8a03&s=*", {fixture: "errorResponse"}).as("errorCall");
    cy.get("button").click();
    cy.get("p").should("have.value", "").contains("Inga sökresultat att visa");
  });

  it("Should display error", () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=efad8a03&s=*", {fixture: "errorResponse"}).as("errorCall");
    cy.get("input").type("Starwars");
    cy.get("button").click();
    cy.get("p").should("have.value", "").contains("Inga sökresultat att visa");
  });
})