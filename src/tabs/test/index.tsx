import type { SoundModuleState } from '../../bundles/sound/types';
import { getModuleState, type DebuggerContext, type ModuleTab } from '../../typings/type_helpers';
import MultiItemDisplay from '../common/MultItemDisplay';

/**
 * Test tab attached to the Source Academy sound module.
 */
const TestTab: ModuleTab = ({ context }) => {
  const { shownArrays } = getModuleState<SoundModuleState>(context, 'sound');

  const elements = shownArrays.map((shownArray) => (
    <div>
      <p>{shownArray.msg}</p>
      <table>
        <tr>
          <th>Index</th>
          <th>Value</th>
        </tr>
        {
          [...shownArray.arr.entries()].map(
            ([index, value]) => (
              <tr>
                <td>{index}</td>
                <td>{value}</td>
              </tr>
            )
          )
        }
      </table>
    </div>
  ));

  return (
    <div>
      <p>
        debug
      </p>
      <br />
      <br />
      <MultiItemDisplay elements={elements} />
      <br />
    </div>
  );
}

export default {
  /**
   * This function will be called to determine if the component will be
   * rendered.
   * @returns {boolean}
   */
  toSpawn(context: DebuggerContext) {
    const shownArrays = context.context?.moduleContexts?.sound?.state?.shownArrays;
    return shownArrays.length > 0;
  },
  /**
   * This function will be called to render the module tab in the side contents
   * on Source Academy frontend.
   * @param {DebuggerContext} context
   */
  body(context: DebuggerContext) {
    return <TestTab context={context} />;
  },

  /**
   * The Tab's icon tooltip in the side contents on Source Academy frontend.
   */
  label: 'Debug',

  /**
   * BlueprintJS IconName element's name, used to render the icon which will be
   * displayed in the side contents panel.
   * @see https://blueprintjs.com/docs/#icons
   */
  iconName: 'add'
}