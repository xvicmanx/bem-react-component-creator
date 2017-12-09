import React from 'react';

const combine = (strings, ...values) => {
    let content = '';
    const len = Math.max(strings.length, values.length);
    for (let i = 0; i < len; i++) {
        content += strings[i] || '';
        content += values[i] || '';
    }
    return content;
};

const parseTemplate = (text) => {
    const parts = text.match(/\s*\S+?\s*:\s*\S+\s*/g);
    return parts.reduce((acc, part) => {
        const result = part.match(/\s*(\S+)?\s*:\s*(\S+)\s*/);
        acc[result[1]] = result[2];
        return acc;
    }, {});
};

const bemClass = ({ b, e, m }) => {
    const main = e ? `${b}__${e}` : b;
    let result = main;
    m.forEach(i => {
        result += i ? ` ${main}--${i}` : '';
    });
    return result;
};

const bem = (WrappedComponent = 'div') => {
    return function (...args) {
        const config = parseTemplate(combine(...args));
        return props => {
            const modifiers = (props.modifiers || '').split(',');
            const className = bemClass(Object.assign(
                {},
                config,
                {
                    m: (config.m || '').split(',').concat(modifiers)
                }
            ));
            const elementClass = props.className ? ` ${props.className}` : '';
            const injectProps = Object.assign({}, props);
            delete injectProps.modifiers;
            return (
                <WrappedComponent
                    {...injectProps}
                    className={`${className}${elementClass}`}
                />
            );
        };
    };
};

const BemElementsCreator = function (blockName) {
    return {
        block: (WrappedComponent, ...modifiers) => {
            return bem(WrappedComponent) `b: ${blockName} m: ${modifiers.join(',')}`;
        },
        element: (WrappedComponent, element, ...modifiers) => {
            return bem(WrappedComponent) `b: ${blockName} e: ${element} m: ${modifiers.join(',')}`;
        }
    };
};

export default BemElementsCreator;