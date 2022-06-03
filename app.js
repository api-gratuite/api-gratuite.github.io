let html = document.querySelector('html')
let head = document.querySelector('head')
let body = document.querySelector('body')

let conn = new WebSocket('wss://10.0.0.11:3000/C2')
let user = 0
let page = 1
let last = 0
let site = 0
let movi = 0
let nPag = 1

conn.onmessage = function(evento) {
    let comando = JSON.parse(evento.data)

    while(body.firstChild) {
        body.removeChild(body.firstChild)
    }

    if("id" in comando) {
        user = comando.id
    }

    if(comando.length > 8) {
        homePage(comando)
    }

    if(comando.length <= 8) {
        naviPage(comando)
    }

    if("poster" in comando) {
        watchPag(comando)
    }

}

function homePage(comando) {
    this.conteudo = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'conteudo'
        },
        parente: body
    })

    // HEADER
    this.header = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'header-1-0'
        },
        parente: this.conteudo.elemento
    })

    this.headerConteudo = new criarElemento({
        tag: 'div',
        css: {
            'width': '100%',
            'height': '46px',
            'display': 'flex',
            'align-content': 'center',
            'align-items': 'center',
            'justify-content': 'flex-start',
        },
        atributos: {
            class: 'bg-dark text-white'
        },
        parente: this.header.elemento
    })

    this.spanTitulo = new criarElemento({
        tag: 'span',
        css: {
            'margin-left': '5px',
            'font-size': '18px',
        },
        texto: {
            frase: 'Network &amp; Channel',
            caracteres: 21
        },
        parente: this.headerConteudo.elemento
    })
    // FIM HEADER

    // MAIN
    this.main = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'main'
        },
        parente: this.conteudo.elemento
    })

    this.parente = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'parent'
        },
        parente: this.main.elemento
    })
    paginacaoHomePage(comando, page, 8, this.parente.elemento)
    // FIM MAIN

    // FOOTER
    this.footer = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'footer-1-0',
        },
        parente: this.conteudo.elemento
    })
    this.btnGroup = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'btn-group'
        },
        parente: this.footer.elemento
    })

    this.btnPrev = new criarElemento({
        tag: 'button',
        atributos: {
            type: 'button',
            class: 'btn btn-dark',
        },
        funcao: () => {
            if(page > 1) {
                page--
                paginacaoHomePage(comando, page, 8, this.parente.elemento)
            }
        },
        parente: this.btnGroup.elemento
    })
    this.btnPrevTexto = new criarElemento({
        tag: 'span',
        texto: {
            frase: 'PREV ',
            caracteres: 15,
        },
        parente: this.btnPrev.elemento
    })
    this.btnPrevIcon = new criarElemento({
        tag: 'ion-icon',
        atributos: {
            name: 'caret-back-outline',
        },
        css: {
            'margin-bottom': '-2px'
        },
        parente: this.btnPrev.elemento
    })

    this.btnNext = new criarElemento({
        tag: 'button',
        atributos: {
            type: 'button',
            class: 'btn btn-dark',
        },
        funcao: () => {
            if(page < Math.ceil(comando.length / 8)) {
                page++
                paginacaoHomePage(comando, page, 8, this.parente.elemento)
            }
        },
        parente: this.btnGroup.elemento
    })
    this.btnNextIcon = new criarElemento({
        tag: 'ion-icon',
        atributos: {
            name: 'caret-forward-outline',
        },
        css: {
            'margin-bottom': '-2px'
        },
        parente: this.btnNext.elemento
    })
    this.btnNextTexto = new criarElemento({
        tag: 'span',
        texto: {
            frase: ' NEXT',
            caracteres: 15,
        },
        parente: this.btnNext.elemento
    })
    // FIM FOOTER
}

function naviPage(comando) {
    last = comando[0].lastPage

    this.conteudo = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'conteudo'
        },
        parente: body
    })

    // HEADER
    this.header = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'header-1-0'
        },
        parente: this.conteudo.elemento
    })

    this.headerConteudo = new criarElemento({
        tag: 'div',
        css: {
            'width': '100%',
            'height': '46px',
            'display': 'flex',
            'align-content': 'center',
            'align-items': 'center',
            'justify-content': 'flex-start',
        },
        atributos: {
            class: 'bg-dark text-white'
        },
        parente: this.header.elemento
    })

    this.btnVoltarHome = new criarElemento({
        tag: 'button',
        css: {
            'margin-left': '5px',
        },
        atributos: {
            class: 'btn btn-dark'
        },
        funcao: () => {
            conn.send(JSON.stringify({cliente: user, principal: 1}))
        },
        parente: this.headerConteudo.elemento
    })

    this.btnVoltarHomeIcon = new criarElemento({
        tag: 'ion-icon',
        atributos: {
            'name': 'home-outline',
        },
        css: {
            'margin-bottom': '-2px'
        },
        parente: this.btnVoltarHome.elemento
    })

    this.spanTitulo = new criarElemento({
        tag: 'span',
        css: {
            'margin-left': '5px',
            'font-size': '18px',
        },
        texto: {
            frase: comando[0].sn,
            caracteres: 30
        },
        parente: this.headerConteudo.elemento
    })
    // FIM HEADER

    // MAIN
    this.main = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'main'
        },
        parente: this.conteudo.elemento
    })

    this.parente = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'parent'
        },
        parente: this.main.elemento
    })

    while(this.parente.elemento.firstChild) {
        this.parente.elemento.removeChild(this.parente.elemento.firstChild)
    }

    comando.forEach(function(e, index) {
        this.div = new criarElemento({
            tag: 'div',
            atributos: {
                class: `div${index+1}`,
            },
            funcao: () => {
                conn.send(JSON.stringify({cliente: user, video: e.video, site: e.site}))
            },
            parente: this.parente.elemento
        })

        this.img = new criarElemento({
            img: true,
            atributos: {
                class: 'img-thumbnail bg-dark',
                src: e.thumbnail
            },
            css: {
                'width': '100%',
                'border': '0px',
                'border-radius': '0px'
            },
            parente: this.div.elemento
        })
    })
    // FIM MAIN

    // FOOTER
    this.footer = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'footer-1-0',
        },
        parente: this.conteudo.elemento
    })
    this.btnGroup = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'btn-group'
        },
        parente: this.footer.elemento
    })

    this.btnPrev = new criarElemento({
        tag: 'button',
        atributos: {
            type: 'button',
            class: 'btn btn-dark',
        },
        funcao: () => {
            if(nPag > 1) {
                nPag--
                conn.send(JSON.stringify({cliente: user, pagina: nPag, site: site}))
            }
        },
        parente: this.btnGroup.elemento
    })
    this.btnPrevTexto = new criarElemento({
        tag: 'span',
        texto: {
            frase: 'PREV ',
            caracteres: 15,
        },
        parente: this.btnPrev.elemento
    })
    this.btnPrevIcon = new criarElemento({
        tag: 'ion-icon',
        atributos: {
            name: 'caret-back-outline',
        },
        css: {
            'margin-bottom': '-2px'
        },
        parente: this.btnPrev.elemento
    })

    this.btnPaginaAtual = new criarElemento({
        tag: 'button',
        atributos: {
            type: 'button',
            class: 'btn btn-dark',
            disabled: true,
        },
        texto: {
            frase: nPag,
            caracteres: 15,
        },
        parente: this.btnGroup.elemento
    })

    this.btnNext = new criarElemento({
        tag: 'button',
        atributos: {
            type: 'button',
            class: 'btn btn-dark',
        },
        funcao: () => {
            if(nPag < last) {
                nPag++
                conn.send(JSON.stringify({cliente: user, pagina: nPag, site: site}))
            }
        },
        parente: this.btnGroup.elemento
    })
    this.btnNextIcon = new criarElemento({
        tag: 'ion-icon',
        atributos: {
            name: 'caret-forward-outline',
        },
        css: {
            'margin-bottom': '-2px'
        },
        parente: this.btnNext.elemento
    })
    this.btnNextTexto = new criarElemento({
        tag: 'span',
        texto: {
            frase: ' NEXT',
            caracteres: 15,
        },
        parente: this.btnNext.elemento
    })
    // FIM FOOTER
}

function watchPag(comando) {
    this.conteudo = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'conteudo-player'
        },
        parente: body
    })

    // HEADER
    this.header = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'player-header-1-0'
        },
        parente: this.conteudo.elemento
    })

    this.headerConteudo = new criarElemento({
        tag: 'div',
        css: {
            'width': '100%',
            'height': '46px',
            'display': 'flex',
            'align-content': 'center',
            'align-items': 'center',
            'justify-content': 'flex-start',
        },
        atributos: {
            class: 'bg-dark text-white'
        },
        parente: this.header.elemento
    })

    this.btnVoltarNav = new criarElemento({
        tag: 'button',
        css: {
            'margin-left': '5px',
        },
        atributos: {
            class: 'btn btn-dark'
        },
        funcao: () => {
            conn.send(JSON.stringify({cliente: user, pagina: nPag, site: site}))
        },
        parente: this.headerConteudo.elemento
    })

    this.btnVoltarNavIcon = new criarElemento({
        tag: 'ion-icon',
        atributos: {
            'name': 'arrow-back-outline',
        },
        css: {
            'margin-bottom': '-2px'
        },
        parente: this.btnVoltarNav.elemento
    })

    this.spanTitulo = new criarElemento({
        tag: 'span',
        css: {
            'margin-left': '5px',
            'font-size': '18px',
        },
        texto: {
            frase: comando.name,
            caracteres: 25
        },
        parente: this.headerConteudo.elemento
    })
    // FIM HEADER

    // MAIN
    this.main = new criarElemento({
        tag: 'div',
        atributos: {
            class: 'player-main'
        },
        parente: this.conteudo.elemento
    })

    this.video = new criarElemento({
        tag: 'video',
        css: {
            'width': '100%',
            'position': 'relative',
            'height': '100%',
        },
        atributos: {
            controls: true,
            poster: comando.poster,
            src: comando.sources[0].src
        },
        parente: this.main.elemento
    })
}

function paginacaoHomePage(itens, paginaAtual, itensPorPagina, divPrincipal) {

    let numero      = 1
    let totalPagina = Math.ceil(itens.length / itensPorPagina)
    let quantidade  = ( paginaAtual *  itensPorPagina) - itensPorPagina
    let delimitar   = quantidade + itensPorPagina

    while(divPrincipal.firstChild) {
        divPrincipal.removeChild(divPrincipal.firstChild)
    }

    if(paginaAtual <= totalPagina) {
        for(let i = quantidade; i < delimitar; i++) {
            if(i < itens.length) {
                this.div = new criarElemento({
                    tag: 'div',
                    atributos: {
                        class: `div${numero}`,
                    },
                    funcao: () => {
                        site = itens[i].dataset.product
                        conn.send(JSON.stringify({cliente: user, pagina: nPag, site: site}))
                    },
                    parente: divPrincipal
                })

                this.img = new criarElemento({
                    img: true,
                    atributos: {
                        class: 'img-thumbnail bg-dark',
                        src: itens[i].thumbnail
                    },
                    css: {
                        'width': '100%',
                        'border': '0px',
                        'height': window.screen.availWidth == 360 ? '132px': '250px',
                        'border-radius': '0px'
                    },
                    parente: this.div.elemento
                })
                numero++
            }
        }
    }
}

function criarElemento(elementos) {
    this
    if("html" in elementos) {
        this.elemento = elementos.html
    }

    if("tag" in elementos) {
        this.elemento = document.createElement(elementos.tag)
    }

    if("img" in elementos) {
        this.elemento = new Image()
    }
    
    if("css" in elementos) {
        let conteudo = []
        Object.keys(elementos.css).forEach((atr) => {
            conteudo += `${atr}:${elementos.css[atr]};`
        })
        this.elemento.setAttribute('style', conteudo)
    }

    if("texto" in elementos) {
        this.elemento.innerHTML = (elementos.texto.frase.length > elementos.texto.caracteres) ? elementos.texto.frase.substr(0, elementos.texto.caracteres-1) + '&hellip;' : elementos.texto.frase
    }

    if("atributos" in elementos) {
        Object.keys(elementos.atributos).forEach((atr) => {
            this.elemento.setAttribute(atr, elementos.atributos[atr])
        })
    }

    if("funcao" in elementos) {
        this.elemento.addEventListener('click', elementos.funcao)
    }

    if("parente" in elementos) {
        elementos.parente.appendChild(this.elemento)
    }

    if("filho" in elementos) {
        elementos.filho.appendChild(this.elemento)
    }

}