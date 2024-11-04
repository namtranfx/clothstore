import React from 'react'
import Hero from './Hero'
import Featured from './Featured'
interface LandingPageProp {
    LandingData: StoreInfo
    featuredProducts: Products[]    
}
const LandingPage: React.FC<LandingPageProp> = ({LandingData, featuredProducts}) => {
  return (
    <section className='flex flex-col w-full'>
        <Hero storeInfo={LandingData} h={920} isHome={true}/>
        <Featured featureProducts={featuredProducts}/>
    </section>
  )
}

export default LandingPage