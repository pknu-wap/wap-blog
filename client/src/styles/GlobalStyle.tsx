import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	font-family: 'Roboto', sans-serif;
	line-height: 1;
  color: ${(props) => props.theme.textColor};
  background-color:${(props) => props.theme.bgColor};
	height: 200vh;
	&::-webkit-scrollbar {
  	width: 20px;
	}
	&::-webkit-scrollbar-track {
		background-color: #e4e4e4;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 100px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: #8070d4;
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: #5749d2
	}
}
a{
	text-decoration:none;
	color:inherit;
	
	
}
*{
	box-sizing:border-box;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
form{
	color: black
}
`;

export default GlobalStyle;
