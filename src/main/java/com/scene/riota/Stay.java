
package com.scene.riota;

import java.awt.AWTException;
import java.awt.Image;
import java.awt.MenuItem;
import java.awt.PopupMenu;
import java.awt.SystemTray;
import java.awt.Toolkit;
import java.awt.TrayIcon;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * タスク常駐プログラム.
 */
public class Stay {

    public static void main(String[] args) {
        Stay app = new Stay();
        app.run();
    }

    /**
     * システムトレイにアイコンを出すメソッド
     */
    private void run() {
        SystemTray tray = SystemTray.getSystemTray(); // システムトレイを取得
        PopupMenu popup = new PopupMenu(); // ※4 ポップアップメニューを生成
        System.out.println(ClassLoader.getSystemClassLoader());

        URL[] urls = ((URLClassLoader) (Thread.currentThread().getContextClassLoader())).getURLs();
        for(URL url :urls){
            System.out.println(url);
        }
        
        Path file = Paths.get(urls[0] + "/resources/pronama.png");

        // ClassLoader.getSystemResource("/Users/miyagi/DEV/private/Riota-Utils/src/main/resources/pronama.png")
        Image image = Toolkit.getDefaultToolkit().createImage(file.toString()); // アイコン画像を準備
        TrayIcon icon = new TrayIcon(image, "Sample Java App", popup); // ※4 トレイアイコンとして生成
        icon.setImageAutoSize(true); // リサイズ

        // ※3 ポップアップメニューの中身を作成
        MenuItem item1 = new MenuItem("Hello");
        item1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Hello world!!");
            }
        });

        MenuItem item2 = new MenuItem("Exit");
        item2.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                tray.remove(icon);
                // System.exit(0);
            }
        });
        popup.add(item1); // ※4
        popup.add(item2); // ※4

        try {
            tray.add(icon); // システムトレイに追加
        } catch (AWTException e) {
            e.printStackTrace();
        }
    }

}
