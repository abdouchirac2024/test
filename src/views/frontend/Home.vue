<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <Hero />
    
    <FeatureCards />
    <Highlights />

    
    <Projects />
    <CommentSection />
    <Partners /> 

    
  </div>
</template>

<script>
import Hero from '../../components/frontend/hero/Hero.vue';
import FeatureCards from '../../components/frontend/card/FeatureCards.vue';
import Highlights from '../../components/frontend/highlit/Highlights.vue';

import Projects from '../../components/frontend/project/Projects.vue';
import Partners from '../../components/frontend/partner/Partners.vue';
import CommentSection from '../../components/frontend/comment/CommentSection.vue';


export default {
  name: 'Home',
  components: {
    Hero,
    FeatureCards,
    Highlights,
  
     
  
    Projects,
    Partners, 
    CommentSection 
  
  }
};
</script>
