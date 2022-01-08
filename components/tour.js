const main = document.querySelector('main')
const currentLocation = window.location.href;
const locationParts = currentLocation.split('#');
const height = window.innerHeight
const links = {
  default: 'https://www.google.com/maps/embed?pb=!4v1628590927413!6m8!1m7!1sCAoSLEFGMVFpcE9WeFpRdVN5M0J4OVRfSHBIXzdGdEJIRFRYdkk2U0YtQTEwb2NU!2m2!1d48.86181593314584!2d2.336681797486702!3f81.55!4f-16.599999999999994!5f0.7820865974627469',
  royal: 'https://www.google.com/maps/embed?pb=!4v1628591008033!6m8!1m7!1sCAoSLEFGMVFpcE1aOVlnbkFyYndFSWJUREFOZVNRWUZ1OWdOcXBXXzJTdjhGQnZZ!2m2!1d48.8606881835717!2d2.335679134426641!3f328.36!4f-2.450000000000003!5f0.4000000000000002',
  denon: 'https://www.google.com/maps/embed?pb=!4v1628591065925!6m8!1m7!1sCAoSLEFGMVFpcE5Sal9Dd1A0Y29ETVlkQ0hqNnFIZUJlSnBJMlZ4VTVCVXNPWDRG!2m2!1d48.8563254!2d2.3352706!3f0!4f0!5f0.7820865974627469',
  colonnade: 'https://www.google.com/maps/embed?pb=!4v1628591114769!6m8!1m7!1sCAoSLEFGMVFpcE5NWkdRdUVBLXBBVXZJR19lUF8yZjNnV1RLWkVKNlhMVkotUGdi!2m2!1d48.8601723!2d2.3395439!3f322.04!4f-5.75!5f0.440292882915489',
  greek: 'https://www.google.com/maps/embed?pb=!4v1628591154056!6m8!1m7!1sCAoSLEFGMVFpcFA3dUZablRJVFJlLTdBRVZBZ0hBZnFpQ0wtMDNndkJIY1lXZ0Yz!2m2!1d48.86018303140322!2d2.335615591987402!3f177.69!4f5.609999999999999!5f0.4000000000000002',
  mona: 'https://www.google.com/maps/embed?pb=!4v1628591355265!6m8!1m7!1sCAoSLEFGMVFpcE8xd2tVVWJ5enBQamotT1IwbVI1ZXRaSlQteGwtNDBYSzhyRFEz!2m2!1d48.85987877384653!2d2.335515730085149!3f7.53!4f4!5f0.5970117501821992',
  night: 'https://www.google.com/maps/embed?pb=!4v1628591405451!6m8!1m7!1sCAoSLEFGMVFpcFBwR0Fvd1lhdFZ5azNNTUduWkFhUWtZbTJFVWstRGxjYTA2U1M1!2m2!1d48.8563254!2d2.3352706!3f21.26!4f-10.090000000000003!5f0.4000000000000002'
}
let link = locationParts[1];
let source = links[link]
if (!link) { source = links.default };
function addContext(src) {
  const frame = document.createElement('iframe')
  frame.src = source;
  frame.height = `${height}px`
  frame.width="100%"
  frame.style="border:0;"
  frame.allowfullscreen="true"
  frame.loading="lazy"
  main.append(frame);
};
addContext(link);