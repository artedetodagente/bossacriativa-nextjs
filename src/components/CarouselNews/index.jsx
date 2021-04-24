/* eslint-disable no-param-reassign */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import theme from '@/theme';
import {
  Wrapper, Indicator, IndicatorItem, Slide, Item,
} from './styles';

const blockSpin = false;

export default function CarouselNews({ source, renderItem }) {
  const slideScroll = useRef();
  const [settings, setSettings] = useState({
    autoplay: true, slides: source, selected: 0, oldSelected: 0,
  });

  const cortina = ({ altura, topo, piso }) => {
    slideScroll.current.querySelectorAll('.cobertura')
      .forEach((item) => {
        item.style.bottom = piso;
        item.style.height = altura;
        item.style.top = topo;
        item.style.transitionDelay = `${Math.random() / 2}s`;
      });
  };

  const cortinaClose = () => {
    cortina({
      altura: '100%',
      topo: 'auto',
      piso: '0%',
    });
  };

  const cortinaOpen = () => {
    cortina({
      altura: '0px',
      topo: '0px',
      piso: 'auto',
    });
  };

  // executa seleção (rotação) automática
  useEffect(() => {
    if (!settings.autoplay || blockSpin) return () => null;
    const timer = setInterval(() => {
      let mudando = null;
      cortinaClose();
      mudando = setTimeout(() => {
        const sizeOfSlides = settings.slides.length - 1;
        const pos = settings.selected === sizeOfSlides ? 0 : settings.selected + 1;
        setSettings({ ...settings, oldSelected: settings.selected, selected: pos });
        cortinaOpen();
      }, 1200);
      return () => clearTimeout(mudando);
    }, 7000);
    return () => clearInterval(timer);
  });

  // decide voltar se o selecionado não é zero e chegou ao final
  useEffect(() => {
    if (settings.selected !== 0) {
      slideScroll.current.scrollTo(0, 0);
      setSettings({ ...settings, oldSelected: 0, selected: 0 });
    }
  }, [slideScroll.current && slideScroll.current.offsetWidth]);

  // rotação com base no atributo selected do settings
  useEffect(() => {
    const size = slideScroll.current.offsetWidth;
    const scrollX = size * (settings.selected - settings.oldSelected);
    slideScroll.current.scrollBy(scrollX, 0);
  }, [settings.selected]);

  function goPosition(index) {
    cortinaClose();
    let mudando = null;
    mudando = setTimeout(() => {
      if (window.innerWidth > theme.sizes.laptop) {
        setSettings({ ...settings, oldSelected: settings.selected, selected: index });
      } else {
        setSettings({
          ...settings, oldSelected: settings.selected, selected: index, autoplay: true,
        });
      }
      cortinaOpen();
    }, 1200);
    return () => clearTimeout(mudando);
  }

  return (
    <Wrapper
      onMouseOver={() => setSettings({ ...settings, autoplay: false })}
      onMouseLeave={() => setSettings({ ...settings, autoplay: true })}
    >
      <Indicator>
        {
          settings.slides.map((item, index) => (
            <IndicatorItem
              type="button"
              key={index}
              selected={settings.selected === index}
              onClick={() => goPosition(index)}
            />
          ))
        }
      </Indicator>
      <div className="scroll" ref={slideScroll}>
        {
          settings.slides.map((item, index) => (
            <Slide key={index}>
              <Item area="a1">
                { renderItem(item) }
                <div className="cobertura" />
              </Item>
            </Slide>
          ))
        }
      </div>
    </Wrapper>
  );
}

CarouselNews.propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  renderItem: PropTypes.func.isRequired,
};
