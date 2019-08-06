import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@vaadin/vaadin-text-field';
import {AspenSecurableMixin} from '@aspen-elements/aspen-securable-mixin';
import {AspenLinkFldMixin} from '@aspen-elements/aspen-link-fld-mixin/aspen-link-fld-mixin.js';

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
class AspenLinkEditor extends AspenLinkFldMixin(AspenSecurableMixin(PolymerElement)) {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
                --icon-size: 24px;
                --icon-color: var(--app-header-color, #909090);
            }
            paper-icon-button{
                --iron-icon-height: var(--icon-size);
                --iron-icon-width: var(--icon-size);
                color: var(--icon-color);
               margin-top: 20px;
            }

            paper-icon-button[disabled]{
                color: #909090;
            }
            .fld{
                @apply --layout-horizontal;
            }
            vaadin-text-field{
                width: 100%;
            }
        </style>
        <div class="fld">

            
            <paper-tooltip for="button" position="bottom" offset="14">
              [[tooltip]]
            </paper-tooltip>
            
            <paper-icon-button id="button" icon="[[icon]]" disabled="[[isDisabled]]" on-tap="__launch"></paper-icon-button>
            <vaadin-text-field label="[[label]]" value="{{value}}" placeholder="[[placeholder]]" readonly="[[!hasRole]]">
            </vaadin-text-field>
                
        </div>
`;
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
   * Use for one-time configuration of your component after local DOM is initialized. 
   */
  ready() {
      super.ready();

      afterNextRender(this, function() {
          
      });
  }
}

window.customElements.define(AspenLinkEditor.is, AspenLinkEditor);
