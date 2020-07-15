window.addEventListener('load', init);

// Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// To change level
const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
  'computer',
  'javascript',
  'uebmultimedia',
  'canvas',
  'svg',
  'sans serif',
  'html',
  'domelements',
  'wordpress',
  'reactnative',
  'reactjs',
  'nodejs',
  'project',
  'professor',
  'student',
  'ubtubt',
  'covid19',
  'laptop',
  'smartphone',
  'samsung',
  'apple',
  'github',
  'bitbucket',
  'befast',
  'besmart'
];