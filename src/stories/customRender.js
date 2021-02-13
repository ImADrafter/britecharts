const customRender = (component, buildFunction, timeout = 0) => {
    setTimeout(() => buildFunction(), timeout)

    return component;
}

export default customRender;