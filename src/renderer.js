function Renderer({ minScale, maxScale, scaleSensitivity = 10 }) {
	const initialState = {
    	minScale,
        maxScale,
        scaleSensitivity,
        transformation: {	
            originX: 0,
            originY: 0,
            translateX: 0,
            translateY: 0,
            scale: 1
        },
	};
	let state = Object.assign({}, initialState);

	this.zoom = ({ element, x, y, deltaScale }) => {
        const { left, top } = element.getBoundingClientRect();
        const { minScale, maxScale, scaleSensitivity } = state;
        const [ scale, newScale ] = getScale({ scale: state.transformation.scale, deltaScale, minScale, maxScale, scaleSensitivity });
        const originX = x - left - window.scrollX;
        const originY = y - top - window.scrollY;
        const newOriginX = originX / scale;
        const newOriginY = originY / scale;
        const translate = getTranslate({ scale, minScale, maxScale });
        const translateX = translate({ pos: originX, prevPos: state.transformation.originX, translate: state.transformation.translateX });
        const translateY = translate({ pos: originY, prevPos: state.transformation.originY, translate: state.transformation.translateY });

        element.style.transformOrigin = `${newOriginX}px ${newOriginY}px`;
        element.style.transform = getMatrix({ scale: newScale, translateX, translateY });
        state.transformation = { originX: newOriginX, originY: newOriginY, translateX, translateY, scale: newScale };
	}
	this.panBy = ({ element, originX, originY }) => {
		pan({ element, state, originX, originY })
	}
    this.panTo = ({ element, originX, originY, scale }) => {
		if (scale) {
			state.transformation.scale = scale;
		}
        pan({ element, state, originX: originX - state.transformation.translateX, originY: originY - state.transformation.translateY });
	},
	this.reset = () => {
		state = Object.assign({}, initialState);
	}

	const hasPositionChanged = ({ pos, prevPos }) => pos !== prevPos;

	const valueInRange = ({ minScale, maxScale, scale }) => scale <= maxScale && scale >= minScale;

	const getTranslate = ({ minScale, maxScale, scale }) => ({ pos, prevPos, translate }) =>
		valueInRange({ minScale, maxScale, scale }) && hasPositionChanged({ pos, prevPos })
			? translate + (pos - prevPos * scale) * (1 - 1 / scale)
			: translate;

	const getScale = ({ scale, minScale, maxScale, scaleSensitivity, deltaScale }) => {
		let newScale = scale + (deltaScale / (scaleSensitivity / scale));
		newScale = Math.max(minScale, Math.min(newScale, maxScale));
		return [scale, newScale];
	};

	const getMatrix = ({ scale, translateX, translateY }) => `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`;

	const pan = ({ element, state, originX, originY }) => {
		state.transformation.translateX += originX;
		state.transformation.translateY += originY;
		element.style.transform =
			getMatrix({ scale: state.transformation.scale, translateX: state.transformation.translateX, translateY: state.transformation.translateY });
	};
};

module.exports = Renderer;  
