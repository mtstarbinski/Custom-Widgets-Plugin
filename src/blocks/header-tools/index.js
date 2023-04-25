import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import icons from '../../icons.js'
import './main.css'

registerBlockType('wordpress-plus/header-tools', {
  icon: {
    src: icons.primary
  },
  edit({ attributes, setAttributes }) {
    const { showAuth } = attributes;

    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={ __('General', 'wordpress-plus') }>
            <SelectControl
              label={__('Show Login/Register Link', 'wordpress-plus')}
              value={showAuth}
              options={[
                { label: __('No', 'wordpress-plus'), value: false },
                { label: __('Yes', 'wordpress-plus'), value: true }
              ]}
              onChange={newVal => setAttributes({showAuth: newVal === "true"})}  
            />
            <CheckboxControl
                label={__('Show Login/Register Link', 'wordpress-plus')}
                help={
                    showAuth ?
                    __('Showing Link', 'wordpress-plus') :
                    __('Hiding Link', 'wordpress-plus')
                }
                checked={showAuth}
                onChange={newVal => setAttributes({ showAuth: newVal })}
            />
          </PanelBody>
        </InspectorControls>
        <div { ...blockProps }>
            {
                showAuth && <a className="signin-link open-modal" href="#">
                <div className="signin-icon">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="signin-text">
                  <small>Hello, Sign in</small>
                  My Account
                </div>
              </a> 
            }
        </div>
      </>
    );
  }
});