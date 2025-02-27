import styled from '@emotion/styled'
import useIPFS from "@pollinations/ipfs/reactHooks/useIPFS"
import { useEffect, useMemo, useState } from "react"
import TopAlert from "../components/organisms/TopAlert"
import NotebookCard from "../components/temp/NotebookCard"
import { getNotebooks } from "../data/notebooks"
import useFilter from "../hooks/useFilter"

// import heroBGOverlay from '../assets/imgs/bgherooverlay.jpeg'
// import whyBG from '../assets/imgs/new_bg_sections.png'
import whyBG from '../assets/imgs/BG7.png'

import Debug from "debug"
import Banner from '../components/Banner'
import FilterUi from "../components/temp/FilterUi"
import useGPUModels from "../hooks/useGPUModels"
import { BackGroundImage, BaseContainer, GridStyle, Headline } from '../styles/global'

const debug = Debug("ModelsPage")

export default function Models() {

  const { models } = useGPUModels();

  const ipfs = useIPFS("/pollen/ipns")
  const [notebooks, setNotebooks] = useState([])
  useEffect(() => getNotebooks(ipfs).then(setNotebooks), [ipfs])

  debug("got notebooks", notebooks)
  const test = useMemo(()=>{
    if (!notebooks) return [];
    return [
      ...Object.values(models).filter( model => model.listed),
      ...notebooks ]
  },[notebooks, models])



  const { notebookList, options, option } = useFilter(test)



    return (
      <ModelsStyle>
        <TopAlert options={options} />
        {/* <Alert severity="warning">The models using Googl colab are currently not working correctly. If possible use the models that run on our own GPUs for now (with the Bee Icon)</Alert>    */}
        {/* <Banner/> */}

        <ShowReelHeadline>
          {!options.length || 'What will you create?'}
        </ShowReelHeadline>

        <FilterUi options={options} option={option} />

        <GridStyle>
        {
          // hack to hide the ones that are not fetched
          (notebookList.length > 0) &&
          notebookList
          .sort((a,b) => b.featured )
          // .filter(notebook => !notebook.featured)
          .map( notebook => <NotebookCard notebook={notebook} key={notebook.name} />)
        }
        </GridStyle>
        
        <BackGroundImage 
          src={whyBG} 
          top='-10'
          left='10'
          position='fixed'
          zIndex='-1' 
          // transform='scale(1,1)' 
          objectPosition='0% 0%'
          alt="hero_bg_overlay" />


      </ModelsStyle>
  )
};


const ShowReelHeadline = styled(Headline)`
margin: 2em 0 0 0;
font-weight: 600;
font-size: 48px;
`




const ModelsStyle = styled(BaseContainer)`
display: flex;
flex-direction: column;

width: 100%;
min-height: 100vh;
margin-top: 5em;
h3 {
  text-align: center;
  margin: 1em 0 0 0;
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.167;
}
margin-bottom: 2em;
`;


