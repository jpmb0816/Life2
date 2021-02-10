class Button {
	constructor(text, x, y, width, height, color) {
		this.text = text;
		this.x = x;
		this.y = y;
		this.ox = x;
		this.oy = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.xAlign = 'left';
		this.yAlign = 'top';

		this.isVisible = true;

		this.onMouseDownFunction = undefined;
		this.onMouseUpFunction = undefined;
		this.onMouseClickFunction = undefined;
		this.onMouseHoverInFunction = undefined;
		this.onMouseHoverOutFunction = undefined;
		this.isMouseDown = false;
		this.isHover = false;
	}

	addOnMouseDownListener(func) {
		if (!this.onMouseDownFunction) {
			this.onMouseDownFunction = func;
		}
	}

	addOnMouseUpListener(func) {
		if (!this.onMouseUpFunction) {
			this.onMouseUpFunction = func;
		}
	}

	addOnMouseClickListener(func) {
		if (!this.onMouseClickFunction) {
			this.onMouseClickFunction = func;
		}
	}

	addOnMouseHoverInListener(func) {
		if (!this.onMouseHoverInFunction) {
			this.onMouseHoverInFunction = func;
		}
	}

	addOnMouseHoverOutListener(func) {
		if (!this.onMouseHoverOutFunction) {
			this.onMouseHoverOutFunction = func;
		}
	}

	removeOnMouseDownListener(func) {
		if (this.onMouseDownFunction) {
			this.onMouseDownFunction = undefined;
		}

		this.resetFlags();
	}

	removeOnMouseUpListener(func) {
		if (this.onMouseUpFunction) {
			this.onMouseUpFunction = undefined;
		}

		this.resetFlags();
	}

	removeOnMouseClickListener(func) {
		if (this.onMouseClickFunction) {
			this.onMouseClickFunction = undefined;
		}

		this.resetFlags();
	}

	removeOnMouseHoverInListener(func) {
		if (this.onMouseHoverInFunction) {
			this.onMouseHoverInFunction = undefined;
		}

		this.resetFlags();
	}

	removeOnMouseHoverOutListener(func) {
		if (this.onMouseHoverOutFunction) {
			this.onMouseHoverOutFunction = undefined;
		}

		this.resetFlags();
	}

	resetFlags() {
		this.isMouseDown = false;
		this.isHover = false;
	}

	update(mouse, events) {
		if (!this.isVisible) {
			return;
		}

		if (mouse.type === events[0] && Tools.isPointCollidedToRect(mouse, this)) {
			this.color.a = 0.5;

			if (!this.isMouseDown) {
				this.isMouseDown = true;

				if (this.onMouseDownFunction) {
					this.onMouseDownFunction();
				}
			}
		}
		else if (mouse.type === events[1] && Tools.isPointCollidedToRect(mouse, this)) {
			if (this.onMouseUpFunction) {
				this.onMouseUpFunction();
			}

			if (this.isMouseDown) {
				this.color.a = 1;
				this.isMouseDown = false;

				if (this.onMouseClickFunction) {
					this.onMouseClickFunction();
				}
			}
		}
		else if (this.isMouseDown && mouse.type === events[1]) {
			this.color.a = 1;
			this.isMouseDown = false;
		}
		else if (this.isMouseDown) {
			this.color.a = 0.5;
			this.isMouseDown = true;
		}
		else if (Tools.isPointCollidedToRect({ x: mouse.cx, y: mouse.cy }, this)) {
			this.color.a = 0.8;

			if (!this.isHover) {
				this.isHover = true;

				if (this.onMouseHoverInFunction) {
					this.onMouseHoverInFunction();
				}
			}
		}
		else {
			this.color.a = 1;

			if (this.isHover) {
				this.isHover = false;

				if (this.onMouseHoverOutFunction) {
					this.onMouseHoverOutFunction();
				}
			}
		}
	}

	render(ctx) {
		if (!this.isVisible) {
			return;
		}

		ctx.fillStyle = this.color.toString();
		ctx.fillRect(this.x, this.y, this.width, this.height);

		ctx.fillStyle = 'white';
		ctx.font = '15px sans-serif';

		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';

		ctx.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
	}

	setCoordinate(x, y) {
		this.ox = x;
		this.oy = y;
	}

	setXAlign(xAlign) {
		if (xAlign === 'left' || xAlign === 'center' || xAlign === 'right') {
			this.xAlign = xAlign.toLowerCase();
		}
		else {
			this.xAlign = 'left';
		}
	}

	setYAlign(yAlign) {
		if (yAlign === 'top' || yAlign === 'center' || yAlign === 'bottom') {
			this.yAlign = yAlign.toLowerCase();
		}
		else {
			this.yAlign = 'top';
		}
	}

	reposition(canvas) {
		const width = canvas.width;
		const height = canvas.height;

		if (this.xAlign === 'left') {
			this.x = this.ox;
		}
		else if (this.xAlign === 'center') {
			this.x = (width / 2) - (this.width / 2) + this.ox;
		}
		else if (this.xAlign === 'right') {
			this.x = width - this.width - this.ox;
		}

		if (this.xAlign === 'top') {
			this.y = this.oy;
		}
		else if (this.yAlign === 'center') {
			this.y = (height / 2) - (this.height / 2) + this.oy;
		}
		else if (this.yAlign === 'bottom') {
			this.y = height - this.height - this.oy;
		}
	}
}