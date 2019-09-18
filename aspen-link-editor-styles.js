export const $tempStyle = document.createElement('template');

$tempStyle.innerHTML = `<dom-module id="aspen-link-editor-styles" theme-for="vaadin-text-field">
  <template>
    <style>
    :host {
        width: 100%;
    }

    :host([has-label]){
      padding-top: 10px;
    }
    [part="label"]{
padding-top: 7px;
padding-right: 5px;
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($tempStyle.content);
