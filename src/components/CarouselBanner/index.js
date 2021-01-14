import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Slide, Item, Dots } from './styles';

export default function CarouselBanner({autoplay, source, h}){
    const carousel = useRef();
    const [settings, setSettings] = useState({ autoplay: false, slides: [], selected: 0, prevSelected: 0 });
    const [dots, setDots] = useState([]);
    
    useEffect(() => {
        setSettings({ ...settings, autoplay, slides: source });
    }, []);

    useEffect(() => {
      if (!settings.autoplay) return () => null;
      const timer = setInterval(() => {
        const prev = settings.selected;
        const pos = settings.selected === settings.slides.length - 1 ? 0 : settings.selected + 1;
        setSettings({ ...settings, selected: pos, prevSelected: prev });
      }, 5000);
      return () => clearInterval(timer);
    });

    useEffect(() => {
      const size = carousel.current.offsetWidth;
      if(settings.autoplay){      
        if (settings.selected === 0) carousel.current.scrollBy(-(size * settings.slides.length), 0);
        else carousel.current.scrollBy(size, 0);
      }else{
        if(settings.prevSelected > settings.selected) carousel.current.scrollBy(-(size * (settings.prevSelected - settings.selected)), 0);
        else if(settings.prevSelected == settings.selected) return () => null;
        else carousel.current.scrollBy(size * (settings.selected - settings.prevSelected), 0);
      }
    }, [settings.selected, settings.autoplay]);

    useEffect(() => {
      let dotsList = [];
      for(let x = 0; x <= settings.slides.length - 1; x++){
        dotsList.push(<button onClick={() => {
          const prev = settings.selected;
          setSettings({ ...settings, selected: x, prevSelected: prev, autoplay: false});
        }} key= {x}></button>);
      }
      setDots(dotsList);
    }, [settings.slides, settings.selected]);

      return(
        <>
        <Wrapper
            h={h}
            ref={carousel}
            onMouseOver={() => setSettings({ ...settings, autoplay: false })}
            onMouseLeave={() => setSettings({ ...settings, autoplay: true })}
        >
          {
            settings.slides.map((slide, index) => (
              <Slide key={index}>
                  <Item
                    key={slide.id}
                    photo="https://img.freepik.com/fotos-gratis/transicao-suave-no-azul-para-o-verde_23-2147734210.jpg?size=626&ext=jpg"
                  >
                    <div className="text-container">
                      <h1>{slide.title}</h1>
                      <p>{slide.description}</p>
                    </div>
                    <Dots>
                      {dots}
                    </Dots> 
                  </Item>
              </Slide>
            ))
          }       
        </Wrapper>
        </>
    
      )
}

CarouselBanner.propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  })),
  autoplay: PropTypes.bool,
  h: PropTypes.number,
};

CarouselBanner.defaultProps = {
  source: [{id:1, photo:null, title:'banner 1', description:'hdhshdgusjjgusj djsidjh dd'},{id:2, photo:null, title:'banner 2', description:'hdhshdgusjjgusj djsidjh dd'}, {id:3, photo:null, title:'banner 3', description:'hdhshdgusjjgusj djsidjh dd'} ],
  autoplay: true,
  h: 412,
};
