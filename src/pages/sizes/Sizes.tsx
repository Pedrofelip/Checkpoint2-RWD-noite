import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../routes"
import { Button } from "../../components/button/Button"
import { Layout } from "../../components/layout/Layout"
import { Title } from "../../components/title/Title"
import { RadioCard, SizeActionWrapper, SizeContentWrapper } from "./Sizes.style"
import OrderContext from "../../contexts/OrderContext"

export default function Sizes() {
  const navigate = useNavigate()
  const { pizzaSize, setPizzaSize } = useContext(OrderContext)


  //aqui são os valores dos cards
  const sizeOptions = [
    {
      id: "10",
      flavours: 1,
      size: 35,
      slices: 8,
      text: "Grande",
    },
    {
      id: "11",
      flavours: 2,
      size: 35,
      slices: 8,
      text: "Grande",
    },
    {
      id: "20",
      flavours: 1,
      size: 28,
      slices: 4,
      text: "Média",
    },
    {
      id: "21",
      flavours: 2,
      size: 28,
      slices: 4,
      text: "Média",
    },
    {
      id: "30",
      flavours: 1,
      size: 18,
      slices: 1,
      text: "Broto",
    },
    {
      id: "31",
      flavours: 2,
      size: 18,
      slices: 1,
      text: "Broto",
    },
  ]
//       estadoAtual, função que manipula o estado
  const [sizeId, setSizeId] = useState("")


  //função pra que consiga filtrar o id do card escolhido, recebendo como parametro o id que é uma string
  const getPizzaSize = (id: string) => {
    return sizeOptions.filter((option) => option.id === id)
  }


  // função que joga o valor do objeto clicado no setSizeId(manipula o estado)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSizeId(event.target.value)
  }


  //volta para a pagina anterior(home)
  const handleBack = () => {
    navigate(routes.home)
  }

  // avança para a proxima pagina e leva os dados
  const handleNext = () => {
    //constante criada para armazenar o retorno da função getPizzaSize
    const selectedSize = getPizzaSize(sizeId)
    //passando a constante como parametro na função que manipula o estado PizzaSizeId
    setPizzaSize(selectedSize)
    //avança pra proxima pagina
    navigate(routes.pizzaFlavour)
  }

  useEffect(() => {
    if (pizzaSize.length < 1) return

    setSizeId(pizzaSize[0]?.id)
  }, [])

  return (
    <Layout>
      <Title tabIndex={0}>Escolha o tamanho da sua pizza</Title>
      <SizeContentWrapper>
        {sizeOptions.map(({ id, size, slices, flavours, text }) => (
          <RadioCard key={id}>
            <input
              type="radio"
              id={id}
              name="sizes"
              onChange={handleChange}
              value={id}
              checked={sizeId === id}
            />
            <label htmlFor={id}>
              {text} - {flavours} sabores
              <span>
                Pizza com {slices} pedaços e {size}cm
              </span>
            </label>
          </RadioCard>
        ))}
      </SizeContentWrapper>
      <SizeActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Escolha o sabor</Button>
      </SizeActionWrapper>
    </Layout>
  )
}
