
// angular
import {
  trigger, state, style,
  transition, animate
} from '@angular/animations';


/**
 * PAGE FADE IN
 *
 */
export const pageFadeIn = trigger('pageFadeIn', [
  state('hidden',
    style({
      opacity: '0'
    })
  ),
  state('visible',
    style({
      opacity: '1'
    })
  ),
  transition('* => visible', [
    animate('600ms ease-in')
  ])
]);

/**
 * PAGE FADE OUT
 *
 */
export const pageFadeOut = trigger('pageFadeOut', [
  state('hidden',
    style({
      opacity: '0'
    })
  ),
  state('visible',
    style({
      opacity: '1'
    })
  ),
  transition('* => hidden', [
    animate('300ms ease-out')
  ])
]);

/**
 * ITEM FADE
 *
 */
export const itemFade = trigger('itemFade', [
  state('fadeout',
    style({
      opacity: '0'
    })
  ),
  state('fadein',
    style({
      opacity: '1'
    })
  ),
  transition('* => fadeout', [
    animate('300ms ease-out')
  ]),
  transition('* => fadein', [
    animate('300ms ease-in')
  ])
]);





/**
 * GROW VERTICAL
 *
 */
export const growVertical = trigger('growVertical', [
  state('normal',
    style({
      transform: 'scale(1,0)'
    })
  ),
  state('large',
    style({
      transform: 'scale(1,1)'
    })
  ),/*
    transition(':enter',[
        style({
            transform:'scale(1,1)'
        }),
        animate('1s 100ms ease-in')
    ]),*/
  transition('normal => large', [
    animate('200ms 100ms ease-in')
  ]),
  transition('large => normal', [
    animate('100ms ease-out')
  ]),/*
    transition(':leave',[
        style({
            transform:'scale(1,0)'
        }),
        animate('1s easy-out')
    ])*/
]);

/**
 * GROW HORIZONTAL
 *
 */
export const growHorizontal = trigger('growHorizontal', [
  state('hidden',
    style({
      opacity: '0'
    })
  ),
  state('visible',
    style({
      opacity: '1'
    })
  ),
  transition('hidden <=> visible', [
    animate('350ms ease-out')
  ])
]);


/**
 * basicEffects
 *
 */
export const basicEffect = trigger('basicEffect', [
  state('grow',
    style({
      transform: 'scale(1.5)'
    })
  ),
  state('move',
    style({
      transform: 'translateX(-50px) translateY(-50px)'
    })
  ),
  state('spin',
    style({
      transform: 'rotateY(45deg) rotateZ(60deg)'
    })
  ),
  transition('* => *', [
    animate('500ms ease')
  ])
]);
