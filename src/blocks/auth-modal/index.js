import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import icons from '../../icons.js'
import './main.css'

registerBlockType('wordpress-plus/auth-modal', {
  icon: {
    src: icons.primary
  },
  edit({ attributes, setAttributes }) {
    const { showRegister } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={ __('General', 'wordpress-plus') }>
          <ToggleControl
                label={__('Show Register', 'wordpress-plus')}
                help={
                  showRegister ?
                    __('Showing Registration Form', 'wordpress-plus') :
                    __('Hiding Registration Form', 'wordpress-plus')
                }
                checked={showRegister}
                onChange={newVal => setAttributes({ showRegister: newVal })}
            />
          </PanelBody>
        </InspectorControls>
        <div { ...blockProps }>
          {__('This block is not previewable from the editor. View your site for a live demo.', 'wordpress-plus')}
        </div>
      </>
    );
  }
});