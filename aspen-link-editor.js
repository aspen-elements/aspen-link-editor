import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@vaadin/vaadin-text-field';
import { AspenSecurableMixin } from '@aspen-elements/aspen-securable-mixin';
import { AspenLinkFldMixin } from '@aspen-elements/aspen-link-fld-mixin/aspen-link-fld-mixin.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import './aspen-link-editor-styles';
import '@polymer/polymer/lib/elements/custom-style.js';

/**
 * `aspen-link-editor`  To use a link editor...
 * 
 * 	<aspen-link-editor label="Address" icon="aspen:map-marker" value="{{model.address}}" has-role="[[hasRole]]" linktype="google-map"></aspen-link-editor>

 *  The 'linktype' field determines how the data in the field will be interpreted. For example, if the linktype is a gene
 *  the value will be interpreted as an EntrezGene ID, and an appropriate URL will be constructed.
 *
 * @summary This component is used to edit URLs and IDs associated with URLs.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class AspenLinkEditor extends AspenLinkFldMixin(
  AspenSecurableMixin(PolymerElement)
) {
  static get template() {
    return html`
      <style include="aspen-link-editor-styles" is="custom-style">
        :host {
          display: block;
          --icon-size: 24px;
          --icon-color: var(--app-header-color, #909090);
        }
        paper-icon-button {
          --iron-icon-height: var(--icon-size);
          --iron-icon-width: var(--icon-size);
          color: var(--icon-color);
          margin-top: 8px;
        }

        .green-dot {
          width: 7px;
          margin-top: 15px;
          height: 7px;
          border-radius: 50%;
          background-color: #44d92c;
        }

        .silver-dot {
          width: 7px;
          margin-top: 15px;
          height: 7px;
          border-radius: 50%;
          background-color: silver;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
        }

        paper-icon-button[disabled] {
          color: #909090;
        }
        .fld {
          display: flex;
          align-items: center;
        }
      </style>
      <div class="fld">
        <paper-tooltip for="button" position="bottom" offset="14">
          [[tooltip]]
        </paper-tooltip>

        <div class="icon-wrapper">
          <template is="dom-if" if="{{hasNewData}}">
            <div class="green-dot"></div>
          </template>
          <template is="dom-if" if="{{!hasNewData}}">
            <div class="silver-dot"></div>
          </template>

          <paper-icon-button
            id="button"
            icon="[[icon]]"
            disabled="[[isDisabled]]"
            on-tap="__launch"
          ></paper-icon-button>
        </div>
        <vaadin-text-field
          onfocus="[[onFocusTextField]]"
          label="[[label]]"
          value="{{value}}"
          placeholder="[[placeholder]]"
          readonly="[[!hasRole]]"
        >
        </vaadin-text-field>
      </div>
    `;
  }

  static get properties() {
    return {
      /* Prop function used to open/close search dialogs */
      onLabelClick: {
        type: Function
      },
      /* Prop which provides information if backend has a new data */
      hasNewData: {
        type: Boolean,
        value: null
      },
      /*Text field value */
      value: {
        type: String
      },
      /*Sets to a readonly text field */
      readonly: {
        type: Boolean
      }
    };
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'aspen-link-editor';
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }
  /**
   * onFocusTextField - Method which gets called after vaadin-text-field element gets in focus
   *
   * @param {HTMLElement} e
   * @memberof AspenLinkEditor
   */
  onFocusTextField(e) {
    let label = e.path[3].children[0];

    if (label) {
      label.style.cursor = 'pointer';
      label.addEventListener('click', e => this.onLabelClick(e));
    }
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();

    afterNextRender(this, function() {});

    this.onFocusTextField = this.onFocusTextField.bind(this);
  }
}

window.customElements.define(AspenLinkEditor.is, AspenLinkEditor);
