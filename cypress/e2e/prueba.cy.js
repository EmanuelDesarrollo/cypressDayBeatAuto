describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://172.41.0.22/day_beat_smart/home/default2.htm')
    // cy.wait(5000);
    // cy.get('html').find('body').each(($el) => {
    //   console.log($el.attr('id'));
    // });

    cy.get('frame').then(($frame) => {
      const doc = $frame.contents();
      const inputIdClient = doc.find('input[name="id_cliente"]');
      cy.wrap(inputIdClient).type('130');
      const inputUsername = doc.find('input[name="login"]');
      cy.wrap(inputUsername).type('jgarcia');
      const inputPass = doc.find('input[name="password"]');
      cy.wrap(inputPass).type('FEjgkAmb4k');
      const inputLogin = doc.find('input[value="Ingresar"]');
      cy.wrap(inputLogin).click();
    });
    cy.wait(1000);
    cy.get('frame').then(($frame) => {
      const doc = $frame.contents();

      cy.wrap(doc.find('div')).each(($el) => {

        const divText = Cypress.$($el).text().trim();
        if (divText === 'Consultar') {
          console.log('Encontrado: ', divText);
          cy.wrap($el).click({ force: true });
        }

      });
    });
    cy.wait(1000);
    cy.get('frame').then(($frame) => {
      const doc = $frame.contents();

      cy.wrap(doc.find('a')).each(($el) => {

        const divText = Cypress.$($el).text().trim();
        if (divText === 'Desarrollo Coexistencia (SF-PYT)') {
          // console.log('Encontrado: ', divText);
          cy.wrap($el).click({ force: true });
        }

      });
    });
    cy.wait(1000);
    cy.get('frame').then(($frame) => {
      const doc = $frame.contents();

      cy.wrap(doc.find('tr')).each(($el) => {
        let count = 0;
        $el.find('td').each((index, td) => {
          const $td = Cypress.$(td);
          const tdText = $td.text().trim();

          if (tdText === 'Desarrollos varios') {
            // console.log('Encontrado td: ', tdText);
            count++;
          }
        }
        );
        if (count == 1) {
          $el.find('td').each((index, td) => {
            const $td = Cypress.$(td);

            $td.find('a').each((index, a) => {
              const $a = Cypress.$(a);
              $a.find('img').each((index, img) => {
                const $img = Cypress.$(img);
                const altText = $img.attr('alt');

                if (altText === 'Nueva Transacción') {
                  // console.log('Encontrado img con alt "Nueva Transacción"');
                  cy.wrap($a).dblclick({ force: true });
                }

              })
            })

          })
        }
      }
      );

    });

    cy.wait(1000);
    cy.get('frame').then(($frame) => {

      const doc = $frame.contents();
      const selector1 = doc.find('select');
      console.log("selector1", selector1);

      for (const key in selector1) {
        if (Object.hasOwnProperty.call(selector1, key)) {
          const element = selector1[key];
          const $selector = Cypress.$(element);

          if (element.name === 'id_categoria') {
            console.log('====================================');
            console.log('element', element);
            cy.wrap($selector).select('Desarrollo');
            console.log('====================================');
          }
        }
      }
      // selector1.each((selector) => {D
      //   console.log(selector);
      //   const $selector = Cypress.$(selector);
      //   const id = $selector.attr('name');
      //   const id2 = selector1.attr('name');
      //   // const id3 = selector.attr('name');
      //   console.log('selector id ', id, id2);

      //   if ('id_categoria' === id) {
      //     cy.wrap(selector).select('Desarrollo');
      //     console.log('seleccione en id_categoria, Desarrollo');
      //   }

      //   if ('cod_tipotransaccion' == id) {
      //     selector.select('PUB/NE - 16-Investigación'); //variable
      //     console.log('seleccione en cod_tipotransaccion, Desarrollo');
      //   }

      // });




    });


  });
})
