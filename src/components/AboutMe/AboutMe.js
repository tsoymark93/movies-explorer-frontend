import React from 'react';
import './AboutMe.css';
import photo from '../../images/photo.png';

const AboutMe = () => (
    <section className="project about-me">
        <h2 className="project__title about-me__title">Студент</h2>
        <img src={photo} className="about-me__photo" alt="Мое фото" />
        <div className="about-me__info">
            <h3 className="about-me__name">Марк</h3>
            <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
            <p className="project__description about-me__description">
                Я родился и живу в городе Астана, Казахстан. Закончил факультет информационных технологий. У меня есть
                жена и сын. Я люблю слушать музыку, а ещё увлекаюсь фитнессом. Недавно начал кодить. С 2013 года работаю
                в строительной компании на позиции снабженца. После того, как пройду курс по веб&#8209;разработке,
                планирую начать заниматься фриланс&#8209;заказами и уйти с постоянной работы.
            </p>
            <a className="link about-me__link" href="https://github.com/tsoymark93" rel="noreferrer" target="_blank">
                Github
            </a>
        </div>
    </section>
);

export default AboutMe;
